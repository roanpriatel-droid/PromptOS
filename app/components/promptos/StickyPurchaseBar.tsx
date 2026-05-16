import {Link} from 'react-router';
import {useEffect, useState} from 'react';
import type {Pack, Guide, ShopifyEnrichment} from '~/lib/catalog';
import {PackCover} from './PackCover';
import {GuideCover} from './GuideCover';
import {AddToCartButton} from '~/components/AddToCartButton';

type Props = {
  product: Pack | Guide;
  shopify?: ShopifyEnrichment | null;
  upsellLabel?: string;
  upsellTo?: string;
  showAfterPx?: number;
};

/**
 * Sticky purchase bar shared across pack + guide pages. Slides up after the
 * first 600px of scroll, holds an "Add to cart" CTA and an upsell link to
 * the bundle.
 */
export function StickyPurchaseBar({
  product,
  shopify,
  upsellLabel = 'Get the bundle instead?',
  upsellTo = '/bundles/everything',
  showAfterPx = 600,
}: Props) {
  const canBuy = !!shopify?.variantId && shopify.availableForSale;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfterPx);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfterPx]);

  return (
    <div className={`sticky-purchase${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <div className="sticky-purchase-inner">
        <div className="left">
          <div className="mini-cover">
            {product.type === 'pack'
              ? <PackCover pack={product} />
              : <GuideCover guide={product} />}
          </div>
          <div>
            <span className="name">{product.name}</span>
            <span className="price">${product.priceUSD}</span>
          </div>
        </div>
        <div className="actions">
          <Link to={upsellTo} prefetch="intent" className="secondary">
            {upsellLabel}
          </Link>
          {canBuy ? (
            <AddToCartButton
              className="btn btn-gradient btn-arrow"
              lines={[{merchandiseId: shopify!.variantId, quantity: 1}]}
              analytics={{products: [{productGid: shopify!.variantId, quantity: 1}]}}
              ariaLabel={`Add ${product.name} to cart, $${product.priceUSD}`}
            >
              Add to cart
            </AddToCartButton>
          ) : (
            <button type="button" className="btn btn-gradient btn-arrow" disabled>
              Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
