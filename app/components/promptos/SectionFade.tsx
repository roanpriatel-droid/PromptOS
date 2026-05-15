import {useEffect, useRef, useState, type ReactNode} from 'react';

/**
 * Wrap any section in <SectionFade> to get a fade-up-on-scroll-into-view
 * effect. Pure CSS transition driven by an `is-in` class — toggled by a
 * single IntersectionObserver. No animation library required.
 */
export function SectionFade({
  as: Tag = 'div',
  children,
  className = '',
  delayMs = 0,
}: {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSeen(true);
            obs.disconnect();
            break;
          }
        }
      },
      {rootMargin: '0px 0px -10% 0px', threshold: 0.05},
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [seen]);

  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      className={`fade-up${seen ? ' is-in' : ''} ${className}`.trim()}
      style={delayMs ? {transitionDelay: `${delayMs}ms`} : undefined}
    >
      {children}
    </Component>
  );
}
