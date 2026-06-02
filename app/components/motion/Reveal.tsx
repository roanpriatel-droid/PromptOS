import {useEffect, useRef, useState, type ReactNode} from 'react';

type Props = {
  children: ReactNode;
  delayMs?: number;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'span';
};

/**
 * Fades in (no transform) when the element scrolls into view.
 * Lighter-weight sibling of FadeUp — for content that shouldn't move.
 * Honors prefers-reduced-motion.
 */
export function Reveal({
  children,
  delayMs = 0,
  durationMs = 600,
  className,
  style,
  as = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setEntered(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setEntered(true);
            io.disconnect();
            break;
          }
        }
      },
      {threshold: 0.1, rootMargin: '0px 0px -6% 0px'},
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        ...style,
        opacity: entered ? 1 : 0,
        transition: `opacity ${durationMs}ms var(--v39a-ease-out, cubic-bezier(0.22,1,0.36,1)) ${delayMs}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
