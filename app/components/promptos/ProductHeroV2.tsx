import {Link} from 'react-router';
import type {Pack} from '~/lib/packs';
import type {ShopifyEnrichment} from '~/lib/catalog';
import {PackCover} from './PackCover';
import {BUNDLE} from '~/lib/packs';
import {AddToCartButton} from '~/components/AddToCartButton';
import {BuyTrustStrip} from './BuyTrustStrip';

/**
 * Product hero v2 — two-column with the cover on the left and the buy box
 * on the right. Cover has a hover lift; thumbnails below preview "inside"
 * pages (decorative — same SVG re-used).
 */
export function ProductHeroV2({
  pack,
  shopify,
}: {
  pack: Pack;
  shopify?: ShopifyEnrichment | null;
}) {
  const canBuy = !!shopify?.variantId && shopify.availableForSale;
  return (
    <section className="product-hero-v2">
      <div className="product-hero-v2-inner">
        <div className="product-cover-col">
          <div className="product-cover-v2">
            <PackCover pack={pack} />
          </div>
        </div>

        <div className="product-info-v2">
          <div className="vol">Vol. {pack.number}</div>
          <h1>{pack.headline ?? `${pack.name}.`}</h1>
          <p className="tagline">{pack.tagline}</p>

          <div className="product-price-row">
            <div className="price">${pack.priceUSD}</div>
            <div className="one-time">One-time payment · lifetime updates</div>
          </div>

          {canBuy ? (
            <AddToCartButton
              className="product-buy-btn"
              lines={[{merchandiseId: shopify!.variantId, quantity: 1}]}
              analytics={{products: [{productGid: shopify!.variantId, quantity: 1}]}}
              ariaLabel={`Add ${pack.name} to cart, $${pack.priceUSD}`}
            >
              Add to cart · ${pack.priceUSD}
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </AddToCartButton>
          ) : (
            <button type="button" className="product-buy-btn" disabled aria-disabled="true">
              Currently unavailable
            </button>
          )}
          <BuyTrustStrip />
          <p className="product-upsell">
            Or get all 7 packs for ${BUNDLE.priceUSD}.{' '}
            <Link to="/packs/complete-bundle" prefetch="intent">See the bundle →</Link>
          </p>

          <div className="product-quickstats">
            <div className="stat-card">
              <div className="l">Prompts</div>
              <div className="v">{pack.promptCount}</div>
            </div>
            <div className="stat-card">
              <div className="l">Sections</div>
              <div className="v">{pack.sections.length}</div>
            </div>
            <div className="stat-card">
              <div className="l">Format</div>
              <div className="v">.docx + PDF</div>
            </div>
            <div className="stat-card">
              <div className="l">Delivery</div>
              <div className="v">Instant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
