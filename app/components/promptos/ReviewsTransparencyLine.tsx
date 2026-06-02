import {CATALOG_STATS} from '~/lib/catalog-stats';

/**
 * One-line transparency note that sits above review section headings.
 * Phase 2B of v3.8a — one honest line, no banners, no long disclaimers.
 *
 * Voice: operator-to-operator. Don't make it cute, don't soften it,
 * don't bury it. Just say the thing.
 *
 * v3.9c-tactical: review count now reads from CATALOG_STATS.
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
      feedback. {CATALOG_STATS.totalReviews.toLocaleString()} reviews. The critical ones are still up.
    </p>
  );
}
