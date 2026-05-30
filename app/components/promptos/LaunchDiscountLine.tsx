/**
 * v3.8a Phase 3B — discounted-price callout that lives next to the
 * regular bundle price. Pink (#EC4899) so it pulls the eye.
 *
 * Computes 15% off and rounds to the nearest dollar.
 */
type Props = {
  /** Regular price in USD, e.g. 798. */
  priceUSD: number;
  /** Override the inline style (e.g. for dark backgrounds). */
  light?: boolean;
};

export function LaunchDiscountLine({priceUSD, light}: Props) {
  const discounted = Math.round(priceUSD * 0.85);
  return (
    <span
      className="launch-discount-line"
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 6,
        marginTop: 6,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '0.01em',
        color: '#EC4899',
        textShadow: light ? '0 1px 0 rgba(0,0,0,0.18)' : undefined,
      }}
    >
      ${discounted} with{' '}
      <code
        style={{
          fontFamily: 'inherit',
          fontWeight: 700,
          letterSpacing: '0.06em',
          background: 'rgba(236,72,153,0.10)',
          padding: '1px 7px',
          borderRadius: 999,
        }}
      >
        LAUNCH
      </code>{' '}
      <span style={{color: light ? 'rgba(255,255,255,0.72)' : 'var(--fg-3, #6B6478)', fontWeight: 500}}>
        (ends June 3)
      </span>
    </span>
  );
}
