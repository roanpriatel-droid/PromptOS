import {CATALOG_STATS} from '~/lib/catalog-stats';

/**
 * Three-bullet trust strip that sits just below the Add to cart button
 * on every product page. Phase 2D of v3.8a. Small, muted, no icons —
 * matches the existing footer trust-strip aesthetic.
 *
 * v3.9c-tactical: the operator-count number now reads from
 * CATALOG_STATS so it can never drift from the real review count.
 */
export function BuyTrustStrip() {
  return (
    <p
      className="buy-trust-strip"
      style={{
        marginTop: 12,
        fontSize: 12,
        color: 'var(--fg-3, #6B6478)',
        lineHeight: 1.6,
        letterSpacing: '0.01em',
      }}
    >
      30-day money-back guarantee &middot; {CATALOG_STATS.totalReviews.toLocaleString()} early operators tested
      it &middot; Secure checkout
    </p>
  );
}
