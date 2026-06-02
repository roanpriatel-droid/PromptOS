type Props = {
  /** Brand-color anchor. */
  color?: 'purple' | 'pink';
  /** Visual weight of the orb. */
  intensity?: 'soft' | 'medium' | 'strong';
  /** Width/height of the orb in px. */
  size?: number;
  /** Position the orb's center relative to its containing block, % values. */
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  /** Pass through extra inline style. */
  style?: React.CSSProperties;
};

/**
 * A single soft-glow div used to add ambient color to sections.
 * Position the orb's CENTER via top/right/bottom/left (the component
 * applies a translate so the coordinate is the center of the orb,
 * not its top-left corner).
 *
 * Pair with NoiseTexture to keep the gradient from looking like
 * generic-AI gradient slop.
 */
export function GradientOrb({
  color = 'purple',
  intensity = 'medium',
  size = 480,
  top,
  right,
  bottom,
  left,
  style,
}: Props) {
  const halfPx = `-${Math.round(size / 2)}px`;
  // Anchor the orb's CENTER by offsetting half its size in the
  // corresponding direction.
  const positionStyle: React.CSSProperties = {};
  if (top !== undefined) positionStyle.top = `calc(${top} + ${halfPx})`;
  if (right !== undefined) positionStyle.right = `calc(${right} + ${halfPx})`;
  if (bottom !== undefined) positionStyle.bottom = `calc(${bottom} + ${halfPx})`;
  if (left !== undefined) positionStyle.left = `calc(${left} + ${halfPx})`;

  return (
    <div
      className="v39a-gradient-orb"
      data-color={color}
      data-intensity={intensity}
      aria-hidden
      style={{
        width: size,
        height: size,
        ...positionStyle,
        ...style,
      }}
    />
  );
}
