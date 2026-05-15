import {Link} from 'react-router';
import {useEffect, useState} from 'react';
import type {Pack, Guide} from '~/lib/catalog';
import {PackCover} from './PackCover';
import {GuideCover} from './GuideCover';

type Props = {
  product: Pack | Guide;
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
  upsellLabel = 'Get the bundle instead?',
  upsellTo = '/bundles/everything',
  showAfterPx = 600,
}: Props) {
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
          <Link
            to={`/products/${product.shopifyHandle}`}
            prefetch="intent"
            className="btn btn-gradient btn-arrow"
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
