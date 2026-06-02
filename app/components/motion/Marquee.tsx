import {type ReactNode, useId} from 'react';

type Props = {
  children: ReactNode;
  /** Duration of one full loop in seconds. */
  durationSec?: number;
  /** Pause the loop when the user hovers anywhere in the strip. */
  pauseOnHover?: boolean;
  /** Direction of travel. */
  direction?: 'left' | 'right';
  /** Vertical gap between repeated content blocks (px). */
  gapPx?: number;
  className?: string;
  /** Horizontal gradient mask on the edges so content fades in/out
   *  rather than hard-clipping. */
  fadeEdges?: boolean;
};

/**
 * Pure-CSS infinite horizontal marquee. Renders the children twice
 * back-to-back inside a track that translates -50% (or +50%) over
 * `durationSec`. Respects prefers-reduced-motion (animation paused).
 *
 * Self-contained, no external dep.
 */
export function Marquee({
  children,
  durationSec = 36,
  pauseOnHover = true,
  direction = 'left',
  gapPx = 32,
  className,
  fadeEdges = true,
}: Props) {
  const id = useId().replace(/[:]/g, '');
  const kf = `marquee-${id}`;
  const sign = direction === 'left' ? '-' : '+';

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        WebkitMaskImage: fadeEdges
          ? 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)'
          : undefined,
        maskImage: fadeEdges
          ? 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)'
          : undefined,
      }}
    >
      <style>{`
        @keyframes ${kf} {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(${sign}50%, 0, 0); }
        }
        .${kf}-track {
          display: inline-flex;
          gap: ${gapPx}px;
          padding-right: ${gapPx}px;
          animation: ${kf} ${durationSec}s linear infinite;
          will-change: transform;
        }
        ${pauseOnHover ? `.${kf}-wrap:hover .${kf}-track { animation-play-state: paused; }` : ''}
        @media (prefers-reduced-motion: reduce) {
          .${kf}-track { animation: none; }
        }
      `}</style>
      <div className={`${kf}-wrap`} style={{whiteSpace: 'nowrap'}}>
        <div className={`${kf}-track`}>
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}
