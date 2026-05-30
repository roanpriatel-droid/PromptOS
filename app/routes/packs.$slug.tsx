import {data, Link} from 'react-router';
import type {Route} from './+types/packs.$slug';
import {
  getPackBySlug,
  getRelatedProducts,
  BUNDLES,
  fetchShopifyProduct,
} from '~/lib/catalog';
import {getReviewsForProduct, getReviewStats} from '~/lib/reviews';
import {ProductHeroV2} from '~/components/promptos/ProductHeroV2';
import {ReviewsTransparencyLine} from '~/components/promptos/ReviewsTransparencyLine';
import {ProductSectionsV2} from '~/components/promptos/ProductSectionsV2';
import {SamplePromptFull} from '~/components/promptos/SamplePromptFull';
import {WhoForV2} from '~/components/promptos/WhoForV2';
import {WhatYouGet} from '~/components/promptos/WhatYouGet';
import {RelatedPacksV2} from '~/components/promptos/RelatedPacksV2';
import {NewsletterCTA} from '~/components/promptos/NewsletterCTA';
import {PairWith} from '~/components/promptos/PairWith';
import {ReviewSummary} from '~/components/promptos/ReviewSummary';
import {ReviewGrid} from '~/components/promptos/ReviewGrid';
import {GuaranteeBlock} from '~/components/promptos/GuaranteeBlock';
import {WhyThisWorks} from '~/components/promptos/WhyThisWorks';
import {StickyPurchaseBar} from '~/components/promptos/StickyPurchaseBar';
import {SectionFade} from '~/components/promptos/SectionFade';
import {RatingStars} from '~/components/promptos/RatingStars';
import {
  JsonLd,
  breadcrumbSchema,
  productSchema,
} from '~/components/promptos/JsonLd';

const MEGA = BUNDLES[2];

export const meta: Route.MetaFunction = ({data: loaderData}) => {
  if (!loaderData?.pack) return [{title: 'Pack not found · Promptos'}];
  const p = loaderData.pack;
  const url = `https://promptos.store/packs/${p.slug}`;
  return [
    {title: `${p.name} · Promptos`},
    {name: 'description', content: p.tagline},
    {property: 'og:title', content: `${p.name} · Promptos`},
    {property: 'og:description', content: p.tagline},
    {property: 'og:type', content: 'product'},
    {property: 'og:url', content: url},
    {property: 'product:price:amount', content: String(p.priceUSD)},
    {property: 'product:price:currency', content: 'USD'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {tagName: 'link', rel: 'canonical', href: url},
  ];
};

export async function loader({params, context}: Route.LoaderArgs) {
  const pack = params.slug ? getPackBySlug(params.slug) : undefined;
  if (!pack) {
    throw data('Pack not found', {status: 404});
  }
  const shopify = await fetchShopifyProduct(context.storefront, pack.shopifyHandle);
  const related = getRelatedProducts(pack.slug, 3).filter((p) => p.type === 'pack');
  const stats = getReviewStats(pack.id);
  return {pack, related, stats, shopify};
}

export default function PackRoute({loaderData}: Route.ComponentProps) {
  const {pack, related, stats, shopify} = loaderData;
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: pack.name,
            description: pack.tagline,
            slug: pack.slug,
            category: 'Packs',
            priceUSD: pack.priceUSD,
            reviewCount: stats.count,
            averageRating: stats.average,
          }),
          breadcrumbSchema([
            {name: 'Home', path: '/'},
            {name: 'Packs', path: '/packs'},
            {name: pack.name, path: `/packs/${pack.slug}`},
          ]),
        ]}
      />
      <main id="main" className="page is-active" data-page="product">
        <ProductHeroV2 pack={pack} shopify={shopify} />

        {/* Reviews summary widget under hero */}
        <section style={{padding: '0 0 32px'}}>
          <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)', display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <RatingStars rating={stats.average} size="l" />
              <div>
                <strong style={{fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--ink)'}}>
                  {stats.average.toFixed(1)}
                </strong>
                <span style={{color: 'var(--fg-3)', marginLeft: 8, fontSize: 14}}>
                  {stats.count} early-access reviews
                </span>
              </div>
            </div>
            <a href="#reviews" className="text-link" style={{fontSize: 14}}>Read reviews →</a>
          </div>
        </section>

        <ProductSectionsV2 pack={pack} />
        <SamplePromptFull pack={pack} />
        <WhoForV2 pack={pack} />
        <WhatYouGet />
        <WhyThisWorks />

        <section id="reviews" style={{padding: '96px 0', background: 'var(--bone)', borderBlock: '1px solid var(--hairline)'}}>
          <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
            <SectionFade as="div" style={{maxWidth: 760, margin: '0 auto 48px', textAlign: 'center'}}>
              <ReviewsTransparencyLine />
              <div className="section-eyebrow">Early access reviews</div>
              <h2 style={{fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.4vw, 56px)', letterSpacing: '-0.02em', lineHeight: 1.05}}>
                What buyers said.
              </h2>
            </SectionFade>
            <ReviewSummary average={stats.average} count={stats.count} distribution={stats.distribution} />
            <div style={{marginTop: 40}}>
              <ReviewGrid initialProductId={pack.id} hideProductFilter hideProductLink />
            </div>
            <div style={{textAlign: 'center', marginTop: 32}}>
              <Link to="/reviews" prefetch="intent" className="text-link" style={{fontSize: 14}}>
                Read all reviews →
              </Link>
            </div>
          </div>
        </section>

        <GuaranteeBlock />
        <PairWith slug={pack.slug} heading="Pair with a playbook." />
        <RelatedPacksV2 packs={related as any} />
        <NewsletterCTA />
      </main>

      <StickyPurchaseBar
        product={pack}
        shopify={shopify}
        upsellLabel={`Get everything for $${MEGA.priceUSD}?`}
      />
    </>
  );
}

export function ErrorBoundary() {
  return (
    <main className="notfound">
      <div className="notfound-inner">
        <div className="glitch" aria-hidden>404</div>
        <h1>That pack took a wrong prompt.</h1>
        <p>The full catalog is one click away.</p>
        <div className="actions">
          <a href="/packs" className="btn btn-large btn-gradient btn-arrow">Browse all packs</a>
          <a href="/bundles/everything" className="btn btn-large btn-secondary">See the bundle</a>
        </div>
      </div>
    </main>
  );
}
