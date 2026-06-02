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
import {ProductGallery} from '~/components/promptos/ProductGallery';
import {ValueStack} from '~/components/promptos/ValueStack';
import {WhatsInsideUpgraded} from '~/components/promptos/WhatsInsideUpgraded';
import {ExamplePromptTabs} from '~/components/promptos/ExamplePromptTabs';
import {WhoForGeneric} from '~/components/promptos/WhoForGeneric';
import {WhoNotForShell, OutcomesShell, ComparisonShell} from '~/components/promptos/ContentShells';
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

  // ProductGallery inputs derived from existing pack data.
  const galleryToC = pack.sections.map((s) => ({
    name: s.name,
    meta: `${s.promptCount} prompts`,
  }));
  const gallerySpread = {
    sectionLabel: pack.sections[0]?.name ?? 'Sample',
    promptTitle: pack.sample.title,
    promptBody: pack.sample.prompt,
    proTip: pack.sample.proTip,
  };

  // ExamplePromptTabs gets the single real sample for now. The
  // "simple / medium / premium" 3-tab spec needs 2 more sample bodies
  // per product (a v3.9c content task tracked in IMPLEMENTATION_NOTES).
  const exampleTabs = [
    {
      level: 'medium' as const,
      title: pack.sample.title,
      useCase: pack.sample.useCase,
      body: pack.sample.prompt,
      output: pack.sample.exampleOutput,
      proTip: pack.sample.proTip,
    },
  ];

  // WhatsInsideUpgraded uses sections data directly; we surface the
  // full sampleTitles for each section.
  const whatsInsideSections = pack.sections.map((s) => ({
    name: s.name,
    count: `${s.promptCount} prompts`,
    description: s.description,
    sampleTitles: [...s.sampleTitles],
  }));

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
        {/* Section 1: HERO (existing, kept) */}
        <ProductHeroV2 pack={pack} shopify={shopify} />

        {/* Section 1 supplement: ProductGallery (NEW v3.9b — V1+V2+V3) */}
        <ProductGallery
          slug={pack.slug}
          name={pack.name}
          kind="pack"
          eyebrow={`PACK Nº ${pack.number}`}
          toc={galleryToC}
          spread={gallerySpread}
        />

        {/* Reviews summary widget under hero (existing, kept) */}
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

        {/* Section 2: NEW value stack */}
        <ValueStack kind="pack" productName={pack.name} />

        {/* Section 3: UPGRADED "What's inside" */}
        <WhatsInsideUpgraded kind="pack" sections={whatsInsideSections} totalLine={`${pack.promptCount} prompts across ${pack.sections.length} sections — every prompt listed above.`} />

        {/* Section 4: UPGRADED example prompt (1 tab today, 3 in v3.9c) */}
        <ExamplePromptTabs kind="pack" prompts={exampleTabs} totalAvailable={pack.promptCount} />

        {/* Section 5: KEEP "Why this works" */}
        <WhyThisWorks />

        {/* Section 6: Who this is for (uses existing per-product whoFor data) */}
        <WhoForGeneric
          eyebrow="Who this is for"
          heading={`Built for ${pack.role.replace(/^For /i, '').toLowerCase()} who ship.`}
          whoFor={pack.whoFor}
        />

        {/* Section 7: SHELL — Who this is NOT for */}
        <WhoNotForShell productName={pack.name} />

        {/* Section 8: SHELL — Outcomes */}
        <OutcomesShell productName={pack.name} />

        {/* Section 9: Reviews (existing, atmospheric wrapper added) */}
        <section id="reviews" className="v39a-section" style={{padding: '96px 0', background: 'var(--bone)', borderBlock: '1px solid var(--hairline)'}}>
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

        {/* Section 10: SHELL — Comparison vs alternatives */}
        <ComparisonShell productName={pack.name} />

        {/* Section 11: FAQ — handled at the homepage FAQ accordion; per-product
            FAQ content is a v3.9c task tracked in IMPLEMENTATION_NOTES. */}

        {/* Section 12: Cross-sell — kept as existing PairWith + RelatedPacks */}
        <GuaranteeBlock />
        <PairWith slug={pack.slug} heading="Pair this with a playbook." />
        <RelatedPacksV2 packs={related as any} />
        <WhatYouGet />
        <NewsletterCTA />
      </main>

      {/* Section 13: Sticky CTA bar (existing) */}
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
