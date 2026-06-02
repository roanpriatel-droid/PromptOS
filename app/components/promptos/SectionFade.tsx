import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from 'react';

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
  style,
}: {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'li' | 'ul' | 'ol' | 'aside' | 'p';
  children: ReactNode;
  className?: string;
  delayMs?: number;
  style?: CSSProperties;
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

  // Merge caller-provided style with the delay-driven transitionDelay so
  // both work; transition-delay is the only style the component itself owns.
  const mergedStyle: CSSProperties = {
    ...(style ?? {}),
    ...(delayMs ? {transitionDelay: `${delayMs}ms`} : {}),
  };

  const Component = Tag as 'div';
  return (
    <Component
      ref={ref}
      className={`fade-up${seen ? ' is-in' : ''} ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </Component>
  );
}
