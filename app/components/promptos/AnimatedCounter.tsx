import {useEffect, useRef, useState} from 'react';

type Props = {
  /** Final value to count to. */
  to: number;
  /** Duration in ms. */
  durationMs?: number;
  /** Render prefix (e.g. "$"). */
  prefix?: string;
  /** Render suffix (e.g. "+"). */
  suffix?: string;
  /** Class applied to the rendered span. */
  className?: string;
};

/** Counts up from 0 to `to` once the element scrolls into view. */
export function AnimatedCounter({to, durationMs = 1400, prefix = '', suffix = '', className}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setValue(to);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const start = performance.now();
            const step = (t: number) => {
              const k = Math.min(1, (t - start) / durationMs);
              const eased = 1 - Math.pow(1 - k, 3);
              setValue(Math.round(to * eased));
              if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            obs.disconnect();
            break;
          }
        }
      },
      {threshold: 0.35},
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
