import {useEffect, useRef, type ReactNode} from 'react';

type Props = {
  children: ReactNode;
  /** Multiplier on cursor distance. 0.2 = subtle, 0.5 = pronounced. */
  strength?: number;
  /** Falls back to wrapping in a <span> if you don't want a div. */
  as?: 'div' | 'span';
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Element subtly follows the cursor while it's hovered. Pure React
 * pointer events + transform. Returns to rest on pointer leave.
 *
 * Skipped on touch devices and reduced-motion users.
 */
export function Magnetic({children, strength = 0.25, as = 'div', className, style}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia?.('(pointer: coarse)').matches;
    if (reduce || coarse) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        node.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      });
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (node) {
        node.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        ...style,
        display: as === 'span' ? 'inline-block' : undefined,
        transition: 'transform 320ms var(--v39a-spring-subtle, cubic-bezier(0.16,1,0.3,1))',
        willChange: 'transform',
      }}
    >
      {children}
    </Tag>
  );
}
