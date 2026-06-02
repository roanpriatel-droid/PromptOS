import {useEffect, useRef, useState, type ReactNode} from 'react';

type Props = {
  children: ReactNode;
  /** Delay before the entrance animation starts, ms. */
  delayMs?: number;
  /** Distance to translate from, px. */
  fromY?: number;
  /** Animation duration, ms. */
  durationMs?: number;
  /** className passed through to the wrapper. */
  className?: string;
  /** Inline style passed through to the wrapper. */
  style?: React.CSSProperties;
  /** Render the wrapper as something other than a div. */
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'span';
};

/**
 * Fades up + enters from below when the element scrolls into view.
 * Uses IntersectionObserver + CSS transitions — no JS animation lib.
 * Honors prefers-reduced-motion.
 *
 * Pure React, no external dep. Once the element has entered, the
 * observer is disconnected so it doesn't replay.
 */
export function FadeUp({
  children,
  delayMs = 0,
  fromY = 24,
  durationMs = 700,
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
      {threshold: 0.12, rootMargin: '0px 0px -8% 0px'},
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
        transform: entered ? 'translate3d(0, 0, 0)' : `translate3d(0, ${fromY}px, 0)`,
        transition: `opacity ${durationMs}ms var(--v39a-ease-out, cubic-bezier(0.22,1,0.36,1)) ${delayMs}ms, transform ${durationMs}ms var(--v39a-ease-out, cubic-bezier(0.22,1,0.36,1)) ${delayMs}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
