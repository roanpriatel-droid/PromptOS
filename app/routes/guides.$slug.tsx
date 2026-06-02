import {data, Link} from 'react-router';
import type {Route} from './+types/guides.$slug';
import {getGuideBySlug, BUNDLES, fetchShopifyProduct} from '~/lib/catalog';
import {getReviewsForProduct, getReviewStats} from '~/lib/reviews';
import {GuideCover} from '~/components/promptos/GuideCover';
import {ReviewsTransparencyLine} from '~/components/promptos/ReviewsTransparencyLine';
import {WhoForWhoNotFor} from '~/components/promptos/WhoForWhoNotFor';
import {ThreePathsComparison} from '~/components/promptos/ThreePathsComparison';
import {ChapterList} from '~/components/promptos/ChapterList';
import {ChapterPreview} from '~/components/promptos/ChapterPreview';
import {OutcomesGrid} from '~/components/promptos/OutcomesGrid';
import {TemplateShowcase} from '~/components/promptos/TemplateShowcase';
import {RoadmapTimeline} from '~/components/promptos/RoadmapTimeline';
import {ReviewSummary} from '~/components/promptos/ReviewSummary';
import {ReviewGrid} from '~/components/promptos/ReviewGrid';
import {GuaranteeBlock} from '~/components/promptos/GuaranteeBlock';
import {WhyThisWorks} from '~/components/promptos/WhyThisWorks';
import {PairWith} from '~/components/promptos/PairWith';
import {StickyPurchaseBar} from '~/components/promptos/StickyPurchaseBar';
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
} from '~/components/promptos/JsonLd';

const MEGA = BUNDLES[2];

export const meta: Route.MetaFunction = ({data: loaderData}) => {
  if (!loaderData?.guide) return [{title: 'Playbook not found · Promptos'}];
  const g = loaderData.guide;
  const url = `https://promptos.store/guides/${g.slug}`;
  return [
    {title: `${g.name} · Promptos`},
    {name: 'description', content: g.tagline},
    {property: 'og:title', content: `${g.name} · Promptos`},
    {property: 'og:description', content: g.tagline},
    {property: 'og:type', content: 'product'},
    {property: 'og:url', content: url},
    {property: 'product:price:amount', content: String(g.priceUSD)},
    {property: 'product:price:currency', content: 'USD'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {tagName: 'link', rel: 'canonical', href: url},
  ];
};

export async function loader({params, context}: Route.LoaderArgs) {
  const guide = params.slug ? getGuideBySlug(params.slug) : undefined;
  if (!guide) {
    throw data('Guide not found', {status: 404});
  }
  const shopify = await fetchShopifyProduct(context.storefront, guide.shopifyHandle);
  const reviews = getReviewsForProduct(guide.id);
  const stats = getReviewStats(guide.id);
  return {guide, reviews, stats, shopify};
}

export default function GuideRoute({loaderData}: Route.ComponentProps) {
  const {guide, stats, shopify} = loaderData;
  const canBuy = !!shopify?.variantId && shopify.availableForSale;
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: guide.name,
            description: guide.tagline,
            slug: guide.slug,
            category: 'Playbooks',
            priceUSD: guide.priceUSD,
            reviewCount: stats.count,
            averageRating: stats.average,
          }),
          breadcrumbSchema([
            {name: 'Home', path: '/'},
            {name: 'Playbooks', path: '/guides'},
            {name: guide.name, path: `/guides/${guide.slug}`},
          ]),
        ]}
      />
      <main id="main" className="page is-active" data-page="guide">
        {/* HERO */}
        <section className="guide-hero">
          <div className="guide-hero-inner">
            <div>
              <SectionFade as="div" className="guide-cover-wrap">
                <GuideCover guide={guide} />
              </SectionFade>
            </div>
            <SectionFade as="div" className="guide-info" delayMs={120}>
              <div className="vol">Vol. {guide.number} · {guide.role}</div>
              <h1>{guide.headline ?? `${guide.name}.`}</h1>
              <p className="tagline">{guide.tagline}</p>

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
                  <div className="v">{guide.pageCount}</div>
                </div>
                <div className="stat-card">
                  <div className="l">Chapters</div>
                  <div className="v">{guide.chapterCount}</div>
                </div>
                <div className="stat-card">
                  <div className="l">Templates</div>
                  <div className="v">{guide.templateCount}</div>
                </div>
                <div className="stat-card">
                  <div className="l">Delivery</div>
                  <div className="v">Instant PDF</div>
                </div>
              </div>

              <div className="guide-buy">
                <div className="price-line">
                  <span className="price">${guide.priceUSD}</span>
                  <span className="one-time">one-time · lifetime updates</span>
                </div>
                {canBuy ? (
                  <AddToCartButton
                    className="product-buy-btn"
                    lines={[{merchandiseId: shopify!.variantId, quantity: 1}]}
                    analytics={{products: [{productGid: shopify!.variantId, quantity: 1}]}}
                    ariaLabel={`Add ${guide.name} to cart, $${guide.priceUSD}`}
                  >
                    Add to cart · ${guide.priceUSD}
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
                  Or pair with prompts, get <Link to="/bundles/everything" prefetch="intent">everything for ${MEGA.priceUSD}</Link> (save ${MEGA.savings}).
                </p>
              </div>
            </SectionFade>
          </div>
        </section>

        {/* v3.9b — ProductGallery (Section 1 supplement: V1+V2+V3) */}
        <ProductGallery
          slug={guide.slug}
          name={guide.name}
          kind="guide"
          eyebrow={`PLAYBOOK · G${guide.number}`}
          toc={guide.chapters.map((c) => ({name: c.name, meta: `${c.pageCount} pages`}))}
          spread={{
            sectionLabel: `Chapter ${guide.chapters[0]?.number ?? '01'}`,
            promptTitle: guide.chapters[0]?.name ?? guide.name,
            promptBody: guide.chapters[0]?.description ?? guide.tagline,
            proTip: 'The chapter ends with a one-page worksheet you fill in before moving on.',
          }}
        />

        {/* v3.9b — Section 2 NEW value stack */}
        <ValueStack kind="guide" productName={guide.name} />

        <WhoForWhoNotFor guide={guide} />

        <ThreePathsComparison
          title={`Three ways to start a ${guide.shortName.toLowerCase()} business.`}
          subtitle="Only one of them doesn't waste your money or your year."
          winnerCta={{label: `Get ${guide.shortName}, $${guide.priceUSD}`, to: '#main'}}
        />

        <ChapterList guide={guide} />
        <ChapterPreview guide={guide} />
        <OutcomesGrid title={outcomeHeadline(guide.shortName)} outcomes={guide.outcomes} />
        <TemplateShowcase guide={guide} />
        <RoadmapTimeline guide={guide} />
        <WhyThisWorks />

        {/* v3.9b — Section 10 SHELL — Comparison vs alternatives */}
        <ComparisonShell productName={guide.shortName} />

        {/* Reviews for this guide */}
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
              <ReviewGrid initialProductId={guide.id} hideProductFilter hideProductLink />
            </div>
            <div style={{textAlign: 'center', marginTop: 32}}>
              <Link to="/reviews" prefetch="intent" className="text-link" style={{fontSize: 14}}>
                Read all reviews →
              </Link>
            </div>
          </div>
        </section>

        <GuaranteeBlock />
        <PairWith slug={guide.slug} heading="Operators buy these together." />
      </main>

      <StickyPurchaseBar product={guide} shopify={shopify} />
    </>
  );
}

function outcomeHeadline(shortName: string) {
  return `What you'll be able to do after reading ${shortName}.`;
}

export function ErrorBoundary() {
  return (
    <main className="notfound">
      <div className="notfound-inner">
        <div className="glitch" aria-hidden>404</div>
        <h1>That playbook took a wrong turn.</h1>
        <p>It may have been renamed, or you followed a stale link. The full set lives one click away.</p>
        <div className="actions">
          <a href="/guides" className="btn btn-large btn-gradient btn-arrow">Browse all playbooks</a>
          <a href="/" className="btn btn-large btn-secondary">Home</a>
        </div>
      </div>
    </main>
  );
}
