import {useEffect, useRef, useState, type ReactNode} from 'react';

type Props = {
  children: ReactNode;
  /** Multiplier on scroll position. 0.1 = subtle, 0.3 = obvious. */
  intensity?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Translates Y as the page scrolls, scoped to the element's viewport
 * intersection range so the effect is local to the element rather
 * than scaling with the whole page.
 *
 * Pure React + scroll listener. Honors prefers-reduced-motion.
 */
export function Parallax({children, intensity = 0.15, className, style}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const viewportH = window.innerHeight || 0;
        // Element-relative position: -1 (just entered from below) → +1 (just left from above)
        const t = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
        setOffset(-t * intensity * 100);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate3d(0, ${offset.toFixed(2)}px, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
