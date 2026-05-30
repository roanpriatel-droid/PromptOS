/**
 * One-line transparency note that sits above review section headings.
 * Phase 2B of v3.8a — one honest line, no banners, no long disclaimers.
 *
 * Voice: operator-to-operator. Don't make it cute, don't soften it,
 * don't bury it. Just say the thing.
 */
export function ReviewsTransparencyLine() {
  return (
    <p
      className="reviews-transparency"
      style={{
        fontSize: 12,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--fg-3, #6B6478)',
        margin: '0 0 12px',
        fontWeight: 600,
      }}
    >
      Pre-launch operators got Promptos free in exchange for honest
      feedback. 1,407 reviews. The critical ones are still up.
    </p>
  );
}
