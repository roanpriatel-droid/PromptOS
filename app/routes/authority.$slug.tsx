import {data, Link} from 'react-router';
import type {Route} from './+types/authority.$slug';
import {
  getAuthorityBySlug,
  getRelatedProducts,
  BUNDLES,
  AUTHORITY_BUNDLE,
  fetchShopifyProduct,
  type Authority,
  type Pack,
  type Guide,
  type ShopifyEnrichment,
} from '~/lib/catalog';
import {getReviewsForProduct, getReviewStats} from '~/lib/reviews';

// Pack-style components (used for content-engine)
import {ProductHeroV2} from '~/components/promptos/ProductHeroV2';
import {ReviewsTransparencyLine} from '~/components/promptos/ReviewsTransparencyLine';
import {ProductSectionsV2} from '~/components/promptos/ProductSectionsV2';
import {SamplePromptFull} from '~/components/promptos/SamplePromptFull';
import {WhoForV2} from '~/components/promptos/WhoForV2';
import {WhatYouGet} from '~/components/promptos/WhatYouGet';

// Guide-style components (used for personal-brand + high-ticket-finder)
import {AuthorityCover} from '~/components/promptos/AuthorityCover';
import {WhoForWhoNotFor} from '~/components/promptos/WhoForWhoNotFor';
import {ChapterList} from '~/components/promptos/ChapterList';
import {ChapterPreview} from '~/components/promptos/ChapterPreview';
import {OutcomesGrid} from '~/components/promptos/OutcomesGrid';
import {TemplateShowcase} from '~/components/promptos/TemplateShowcase';
import {RoadmapTimeline} from '~/components/promptos/RoadmapTimeline';
import {ThreePathsComparison} from '~/components/promptos/ThreePathsComparison';

// Shared
import {ReviewSummary} from '~/components/promptos/ReviewSummary';
import {ReviewGrid} from '~/components/promptos/ReviewGrid';
import {GuaranteeBlock} from '~/components/promptos/GuaranteeBlock';
import {WhyThisWorks} from '~/components/promptos/WhyThisWorks';
import {PairWith} from '~/components/promptos/PairWith';
import {StickyPurchaseBar} from '~/components/promptos/StickyPurchaseBar';
import {NewsletterCTA} from '~/components/promptos/NewsletterCTA';
import {SectionFade} from '~/components/promptos/SectionFade';
import {RatingStars} from '~/components/promptos/RatingStars';
import {AddToCartButton} from '~/components/AddToCartButton';
import {BuyTrustStrip} from '~/components/promptos/BuyTrustStrip';
import {ProductGallery} from '~/components/promptos/ProductGallery';
import {ValueStack} from '~/components/promptos/ValueStack';
import {ComparisonShell} from '~/components/promptos/ContentShells';
import {
  JsonLd,
  breadcrumbSchema,
  productSchema,
  withReviews,
} from '~/components/promptos/JsonLd';

const MEGA = BUNDLES[3];

export const meta: Route.MetaFunction = ({data: loaderData}) => {
  if (!loaderData?.product) return [{title: 'Authority product not found · Promptos'}];
  const a = loaderData.product;
  const url = `https://promptos.store/authority/${a.slug}`;
  return [
    {title: `${a.name} · Promptos`},
    {name: 'description', content: a.tagline},
    {property: 'og:title', content: `${a.name} · Promptos`},
    {property: 'og:description', content: a.tagline},
    {property: 'og:type', content: 'product'},
    {property: 'og:url', content: url},
    {property: 'product:price:amount', content: String(a.priceUSD)},
    {property: 'product:price:currency', content: 'USD'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {tagName: 'link', rel: 'canonical', href: url},
  ];
};

export async function loader({params, context}: Route.LoaderArgs) {
  const product = params.slug ? getAuthorityBySlug(params.slug) : undefined;
  if (!product) {
    throw data('Authority product not found', {status: 404});
  }
  const shopify = await fetchShopifyProduct(context.storefront, product.shopifyHandle);
  const related = getRelatedProducts(product.slug, 3);
  const stats = getReviewStats(product.id);
  const topReviews = getReviewsForProduct(product.id)
    .filter((r) => r.rating === 5 && r.body.length >= 80)
    .slice(0, 3)
    .map((r) => ({
      author: r.name,
      rating: r.rating,
      title: r.title,
      body: r.body,
      datePublished: r.date,
    }));
  return {product, related, stats, shopify, topReviews};
}

export default function AuthorityRoute({loaderData}: Route.ComponentProps) {
  const {product, stats, shopify, topReviews} = loaderData;
  return (
    <>
      <JsonLd
        data={[
          withReviews(
            productSchema({
              name: product.name,
              description: product.tagline,
              slug: product.slug,
              category: 'Authority',
              priceUSD: product.priceUSD,
              reviewCount: stats.count,
              averageRating: stats.average,
            }),
            topReviews,
          ),
          breadcrumbSchema([
            {name: 'Home', path: '/'},
            {name: 'Authority', path: '/authority'},
            {name: product.name, path: `/authority/${product.slug}`},
          ]),
        ]}
      />
      {product.coverStyle === 'pack' ? (
        <PackStyle product={product} stats={stats} shopify={shopify} />
      ) : (
        <GuideStyle product={product} stats={stats} shopify={shopify} />
      )}
    </>
  );
}

// =====================================================================
// Pack-style layout (Content Engine)
// =====================================================================
function PackStyle({
  product,
  stats,
  shopify,
}: {
  product: Authority;
  stats: ReturnType<typeof getReviewStats>;
  shopify: ShopifyEnrichment | null;
}) {
  const pack = product as unknown as Pack;
  return (
    <>
      <main id="main" className="page is-active" data-page="authority-pack">
        <ProductHeroV2 pack={pack} shopify={shopify} />

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

        {/* v3.9b — ProductGallery (V1+V2+V3) */}
        <ProductGallery
          slug={pack.slug}
          name={pack.name}
          kind="authority"
          eyebrow="AUTHORITY · A2"
          toc={pack.sections.map((s) => ({name: s.name, meta: `${s.promptCount} prompts`}))}
          spread={{
            sectionLabel: pack.sections[0]?.name ?? 'Sample',
            promptTitle: pack.sample.title,
            promptBody: pack.sample.prompt,
            proTip: pack.sample.proTip,
          }}
        />

        {/* v3.9b — Section 2 NEW value stack */}
        <ValueStack kind="authority" productName={pack.name} />

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
              <ReviewGrid initialProductId={product.id} hideProductFilter hideProductLink />
            </div>
          </div>
        </section>

        {/* v3.9b — Section 10 SHELL */}
        <ComparisonShell productName={pack.name} />

        <GuaranteeBlock />
        <PairWith slug={product.slug} heading="Pair with these." />
        <NewsletterCTA />
      </main>

      <StickyPurchaseBar
        product={pack}
        shopify={shopify}
        upsellLabel={`Get all 3 Authority products for $${AUTHORITY_BUNDLE.priceUSD}?`}
        upsellTo="/bundles/authority"
      />
    </>
  );
}

// =====================================================================
// Guide-style layout (Personal Brand, High-Ticket Finder)
// =====================================================================
function GuideStyle({
  product,
  stats,
  shopify,
}: {
  product: Authority;
  stats: ReturnType<typeof getReviewStats>;
  shopify: ShopifyEnrichment | null;
}) {
  const canBuy = !!shopify?.variantId && shopify.availableForSale;
  // Build a synthetic Guide-shape for components that expect Guide.sample
  const guideShape = {
    ...product,
    sample: product.sampleChapter,
  } as unknown as Guide;

  return (
    <>
      <main id="main" className="page is-active" data-page="authority-guide">
        <section className="guide-hero">
          <div className="guide-hero-inner">
            <div>
              <SectionFade as="div" className="guide-cover-wrap">
                <AuthorityCover product={product} />
              </SectionFade>
            </div>
            <SectionFade as="div" className="guide-info" delayMs={120}>
              <div className="vol">Authority · {product.role}</div>
              <h1>{product.headline ?? `${product.name}.`}</h1>
              <p className="tagline">{product.tagline}</p>

              <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 10}}>
                <RatingStars rating={stats.average} />
                <span style={{fontSize: 13, color: 'var(--fg-3)'}}>
                  <strong style={{color: 'var(--ink)'}}>{stats.average.toFixed(1)}</strong>
                  {' '}from {stats.count.toLocaleString()} early-access reviews
                </span>
              </div>

              <div className="guide-quickstats">
                <div className="stat-card">
                  <div className="l">Pages</div>
                  <div className="v">{product.pageCount}</div>
                </div>
                <div className="stat-card">
                  <div className="l">Chapters</div>
                  <div className="v">{product.chapterCount}</div>
                </div>
                <div className="stat-card">
                  <div className="l">Templates</div>
                  <div className="v">{product.templateCount}</div>
                </div>
                <div className="stat-card">
                  <div className="l">Delivery</div>
                  <div className="v">{product.format === 'pdf+docx' ? 'PDF + .docx' : 'Instant PDF'}</div>
                </div>
              </div>

              <div className="guide-buy">
                <div className="price-line">
                  <span className="price">${product.priceUSD}</span>
                  <span className="one-time">one-time · lifetime updates</span>
                </div>
                {canBuy ? (
                  <AddToCartButton
                    className="product-buy-btn"
                    lines={[{merchandiseId: shopify!.variantId, quantity: 1}]}
                    analytics={{products: [{productGid: shopify!.variantId, quantity: 1}]}}
                    ariaLabel={`Add ${product.name} to cart, $${product.priceUSD}`}
                  >
                    Add to cart · ${product.priceUSD}
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </AddToCartButton>
                ) : (
                  <button type="button" className="product-buy-btn" disabled>
                    Currently unavailable
                  </button>
                )}
                <BuyTrustStrip />
                <p className="upsell">
                  Or get all 3 Authority products for <Link to="/bundles/authority" prefetch="intent">${AUTHORITY_BUNDLE.priceUSD} (save ${AUTHORITY_BUNDLE.savings})</Link>.
                </p>
              </div>
            </SectionFade>
          </div>
        </section>

        {/* v3.9b — ProductGallery (V1+V2+V3) */}
        <ProductGallery
          slug={product.slug}
          name={product.name}
          kind="authority"
          eyebrow={`AUTHORITY · ${product.slug === 'personal-brand' ? 'A1' : 'A3'}`}
          toc={guideShape.chapters.map((c) => ({name: c.name, meta: `${c.pageCount} pages`}))}
          spread={{
            sectionLabel: `Chapter ${guideShape.chapters[0]?.number ?? '01'}`,
            promptTitle: guideShape.chapters[0]?.name ?? product.name,
            promptBody: guideShape.chapters[0]?.description ?? product.tagline,
            proTip: 'Authority products pair: strategy → execution → monetization.',
          }}
        />

        {/* v3.9b — Section 2 NEW value stack */}
        <ValueStack kind="authority" productName={product.name} />

        <WhoForWhoNotFor guide={guideShape} />

        <ThreePathsComparison
          title={`Three ways to build authority.`}
          subtitle="Only one of them doesn't waste your money or your year."
          winnerCta={{label: `Get ${product.shortName}, $${product.priceUSD}`, to: '#main'}}
        />

        <ChapterList guide={guideShape} />
        <ChapterPreview guide={guideShape} />
        {product.outcomes && (
          <OutcomesGrid
            title={`What you'll be able to do after reading ${product.shortName}.`}
            outcomes={product.outcomes}
          />
        )}
        {product.templates && <TemplateShowcase guide={guideShape} />}
        {product.roadmap && <RoadmapTimeline guide={guideShape} />}
        <WhyThisWorks />

        <section style={{padding: '96px 0', background: 'var(--bone)', borderBlock: '1px solid var(--hairline)'}}>
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
              <ReviewGrid initialProductId={product.id} hideProductFilter hideProductLink />
            </div>
          </div>
        </section>

        {/* v3.9b — Section 10 SHELL */}
        <ComparisonShell productName={product.shortName} />

        <GuaranteeBlock />
        <PairWith slug={product.slug} heading="Operators buy these together." />
        <NewsletterCTA />
      </main>

      <StickyPurchaseBar
        product={guideShape}
        shopify={shopify}
        upsellLabel={`Authority Bundle, $${AUTHORITY_BUNDLE.priceUSD}?`}
        upsellTo="/bundles/authority"
      />
    </>
  );
}

export function ErrorBoundary() {
  return (
    <main className="notfound">
      <div className="notfound-inner">
        <div className="glitch" aria-hidden>404</div>
        <h1>That Authority product doesn't exist.</h1>
        <p>Three products live here, Personal Brand, Content Engine, High-Ticket Finder. Pick one of those.</p>
        <div className="actions">
          <a href="/authority" className="btn btn-large btn-gradient btn-arrow">See all Authority products</a>
          <a href="/" className="btn btn-large btn-secondary">Home</a>
        </div>
      </div>
    </main>
  );
}
