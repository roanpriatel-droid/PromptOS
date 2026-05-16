import {data, Link} from 'react-router';
import type {Route} from './+types/bundles.$slug';
import {
  getBundleBySlug,
  BUNDLES,
  PACKS,
  GUIDES,
  AUTHORITY,
  AUTHORITY_BUNDLE,
  fetchShopifyProduct,
  type ShopifyEnrichment,
} from '~/lib/catalog';
import {AuthorityCover} from '~/components/promptos/AuthorityCover';

/** Deterministic-from-day-of-week scarcity number. Cycles each day, feels real. */
function scarcityCount(slug: string): number {
  const day = new Date().toISOString().slice(0, 10);
  let h = 0;
  const seed = `${day}:${slug}`;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) & 0xfffffff;
  // Per-slug base ranges so the mega-bundle reads more popular than guides.
  if (slug === 'everything') return 38 + (h % 25);     // 38–62
  if (slug === 'authority') return 22 + (h % 18);      // 22–39
  if (slug === 'packs') return 28 + (h % 22);          // 28–49
  return 16 + (h % 16);                                 // 16–31 (guides)
}
import {getReviewsForProduct, getReviewStats} from '~/lib/reviews';
import {PackCover} from '~/components/promptos/PackCover';
import {GuideCover} from '~/components/promptos/GuideCover';
import {BundleCover} from '~/components/promptos/BundleCover';
import {SectionFade} from '~/components/promptos/SectionFade';
import {ReviewSummary} from '~/components/promptos/ReviewSummary';
import {ReviewGrid} from '~/components/promptos/ReviewGrid';
import {GuaranteeBlock} from '~/components/promptos/GuaranteeBlock';
import {AnimatedCounter} from '~/components/promptos/AnimatedCounter';
import {FaqV2} from '~/components/promptos/FaqV2';
import {NewsletterCTA} from '~/components/promptos/NewsletterCTA';
import {BundleSelector} from '~/components/promptos/BundleSelector';
import {AddToCartButton} from '~/components/AddToCartButton';
import {
  JsonLd,
  breadcrumbSchema,
  productSchema,
} from '~/components/promptos/JsonLd';

export const meta: Route.MetaFunction = ({data: loaderData}) => {
  if (!loaderData?.bundle) return [{title: 'Bundle not found · Promptos'}];
  const b = loaderData.bundle;
  const url = `https://promptos.store/bundles/${b.slug}`;
  return [
    {title: `${b.name} · Promptos`},
    {name: 'description', content: b.tagline},
    {property: 'og:title', content: `${b.name} · Promptos`},
    {property: 'og:description', content: b.tagline},
    {property: 'og:type', content: 'product'},
    {property: 'og:url', content: url},
    {property: 'product:price:amount', content: String(b.priceUSD)},
    {property: 'product:price:currency', content: 'USD'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {tagName: 'link', rel: 'canonical', href: url},
  ];
};

export async function loader({params, context}: Route.LoaderArgs) {
  const bundle = params.slug ? getBundleBySlug(params.slug) : undefined;
  if (!bundle) {
    throw data('Bundle not found', {status: 404});
  }
  const shopify = await fetchShopifyProduct(context.storefront, bundle.shopifyHandle);
  const reviews = getReviewsForProduct(bundle.id);
  const stats = getReviewStats(bundle.id);
  return {bundle, reviews, stats, shopify};
}

export default function BundleRoute({loaderData}: Route.ComponentProps) {
  const {bundle, stats, shopify} = loaderData;
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: bundle.name,
            description: bundle.tagline,
            slug: bundle.slug,
            category: 'Bundles',
            priceUSD: bundle.priceUSD,
            reviewCount: stats.count,
            averageRating: stats.average,
          }),
          breadcrumbSchema([
            {name: 'Home', path: '/'},
            {name: 'Bundles', path: '/bundles'},
            {name: bundle.name, path: `/bundles/${bundle.slug}`},
          ]),
        ]}
      />
      {bundle.slug === 'everything' ? (
        <EverythingPage stats={stats} shopify={shopify} />
      ) : bundle.slug === 'guides' ? (
        <GuidesBundlePage stats={stats} shopify={shopify} />
      ) : bundle.slug === 'authority' ? (
        <AuthorityBundlePage stats={stats} shopify={shopify} />
      ) : (
        <PacksBundlePage stats={stats} shopify={shopify} />
      )}
    </>
  );
}

// =====================================================================
// /bundles/packs
// =====================================================================
function PacksBundlePage({stats, shopify}: {stats: ReturnType<typeof getReviewStats>; shopify: ShopifyEnrichment | null}) {
  const bundle = BUNDLES[0];
  const canBuy = !!shopify?.variantId && shopify.availableForSale;
  return (
    <main id="main" className="page is-active" data-page="bundle-packs">
      {/* Hero */}
      <section className="bundle-hero-v2">
        <div className="bundle-hero-v2-mesh" aria-hidden />
        <div className="bundle-hero-v2-inner">
          <span className="label">The packs bundle</span>
          <h1>Every prompt pack. <em>One price.</em></h1>
          <p className="sub">{bundle.tagline} All your daily-driver AI prompts in one library.</p>

          <div className="cover-stage" aria-hidden>
            {[1, 2, 0, 6, 4, 3, 5].map((idx, i) => (
              <div key={idx} className={`fc p${i + 1}`}>
                <PackCover pack={PACKS[idx]} />
              </div>
            ))}
          </div>

          <div className="reveal">
            <span className="strike">${bundle.individualTotal}</span>
            <span className="arrow">→</span>
            <span className="now">${bundle.priceUSD}</span>
            <span className="save-badge">Save ${bundle.savings}</span>
          </div>

          <div className="actions">
            {canBuy ? (
              <AddToCartButton
                className="btn btn-large btn-cream btn-arrow"
                lines={[{merchandiseId: shopify!.variantId, quantity: 1}]}
                analytics={{products: [{productGid: shopify!.variantId, quantity: 1}]}}
                ariaLabel={`Add Packs Bundle to cart, $${bundle.priceUSD}`}
              >
                Get the packs bundle · ${bundle.priceUSD}
              </AddToCartButton>
            ) : (
              <button type="button" className="btn btn-large btn-cream btn-arrow" disabled>
                Currently unavailable
              </button>
            )}
            <a href="#breakdown" className="btn btn-large btn-ghost btn-arrow" style={{color: '#fff'}}>What's included</a>
          </div>
        </div>
      </section>

      <section className="bundle-breakdown" id="breakdown">
        <div className="bundle-breakdown-inner">
          {PACKS.map((p) => (
            <SectionFade key={p.slug} as="div" className="bb-row">
              <div className="bb-cover"><PackCover pack={p} /></div>
              <div className="bb-content">
                <div className="vol">Vol. {p.number} · {p.role}</div>
                <h3>{p.name}.</h3>
                <p>{p.tagline}</p>
                <div className="secs">
                  {p.sections.map((s) => (
                    <span key={s.name}>{s.name} · {s.promptCount}</span>
                  ))}
                </div>
                <Link to={`/packs/${p.slug}`} prefetch="intent" className="view-link">View pack →</Link>
              </div>
            </SectionFade>
          ))}
        </div>
      </section>

      <section className="celebration">
        <SectionFade as="div">
          <div className="num"><AnimatedCounter to={430} /></div>
          <div className="sub">Tested. Editable. Yours.</div>
        </SectionFade>
      </section>

      <section style={{padding: '96px 0'}}>
        <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
          <SectionFade as="div" style={{maxWidth: 760, margin: '0 auto 48px', textAlign: 'center'}}>
            <div className="section-eyebrow">Early access reviews</div>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.4vw, 56px)', letterSpacing: '-0.02em', lineHeight: 1.05}}>
              What bundle buyers said.
            </h2>
          </SectionFade>
          <ReviewSummary average={stats.average} count={stats.count} distribution={stats.distribution} />
          <div style={{marginTop: 40}}>
            <ReviewGrid initialProductId={bundle.id} hideProductFilter hideProductLink />
          </div>
        </div>
      </section>

      <GuaranteeBlock />
      <BundleSelector heading="Or go bigger." />
      <FaqV2 />
      <NewsletterCTA />
    </main>
  );
}

// =====================================================================
// /bundles/guides
// =====================================================================
function GuidesBundlePage({stats, shopify}: {stats: ReturnType<typeof getReviewStats>; shopify: ShopifyEnrichment | null}) {
  const canBuyGuides = !!shopify?.variantId && shopify.availableForSale;
  const bundle = BUNDLES[1];
  return (
    <main id="main" className="page is-active" data-page="bundle-guides">
      <section className="bundle-hero-v2">
        <div className="bundle-hero-v2-mesh" aria-hidden />
        <div className="bundle-hero-v2-inner">
          <span className="label">The guides bundle</span>
          <h1>Every playbook. <em>One price.</em></h1>
          <p className="sub">{bundle.tagline}</p>

          <div className="cover-stage" aria-hidden>
            {[1, 2, 0, 6, 4, 3, 5].map((idx, i) => (
              <div key={idx} className={`fc p${i + 1}`}>
                <GuideCover guide={GUIDES[idx]} />
              </div>
            ))}
          </div>

          <div className="reveal">
            <span className="strike">${bundle.individualTotal}</span>
            <span className="arrow">→</span>
            <span className="now">${bundle.priceUSD}</span>
            <span className="save-badge">Save ${bundle.savings}</span>
          </div>

          <div className="actions">
            {canBuyGuides ? (
              <AddToCartButton
                className="btn btn-large btn-cream btn-arrow"
                lines={[{merchandiseId: shopify!.variantId, quantity: 1}]}
                analytics={{products: [{productGid: shopify!.variantId, quantity: 1}]}}
                ariaLabel={`Add Guides Bundle to cart, $${bundle.priceUSD}`}
              >
                Get the guides bundle · ${bundle.priceUSD}
              </AddToCartButton>
            ) : (
              <button type="button" className="btn btn-large btn-cream btn-arrow" disabled>
                Currently unavailable
              </button>
            )}
            <a href="#breakdown" className="btn btn-large btn-ghost btn-arrow" style={{color: '#fff'}}>What's included</a>
          </div>
        </div>
      </section>

      <section className="bundle-breakdown" id="breakdown">
        <div className="bundle-breakdown-inner">
          {GUIDES.map((g) => (
            <SectionFade key={g.slug} as="div" className="bb-row">
              <div className="bb-cover"><GuideCover guide={g} /></div>
              <div className="bb-content">
                <div className="vol">Vol. {g.number} · {g.role}</div>
                <h3>{g.name}.</h3>
                <p>{g.tagline}</p>
                <div className="secs">
                  <span>{g.pageCount} pages</span>
                  <span>{g.chapterCount} chapters</span>
                  <span>{g.templateCount} templates</span>
                </div>
                <Link to={`/guides/${g.slug}`} prefetch="intent" className="view-link">View playbook →</Link>
              </div>
            </SectionFade>
          ))}
        </div>
      </section>

      <section className="celebration">
        <SectionFade as="div">
          <div className="num"><AnimatedCounter to={GUIDES.reduce((s, g) => s + g.pageCount, 0)} />+</div>
          <div className="sub">Pages of real frameworks. <em style={{fontStyle: 'italic', color: 'var(--promptos-pink)'}}>Ready Monday.</em></div>
        </SectionFade>
      </section>

      <section style={{padding: '96px 0'}}>
        <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
          <SectionFade as="div" style={{maxWidth: 760, margin: '0 auto 48px', textAlign: 'center'}}>
            <div className="section-eyebrow">Early access reviews</div>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.4vw, 56px)', letterSpacing: '-0.02em', lineHeight: 1.05}}>
              What bundle buyers said.
            </h2>
          </SectionFade>
          <ReviewSummary average={stats.average} count={stats.count} distribution={stats.distribution} />
          <div style={{marginTop: 40}}>
            <ReviewGrid initialProductId={bundle.id} hideProductFilter hideProductLink />
          </div>
        </div>
      </section>

      <GuaranteeBlock />
      <BundleSelector heading="Or upgrade to Everything." />
      <FaqV2 />
      <NewsletterCTA />
    </main>
  );
}

// =====================================================================
// /bundles/everything (mega)
// =====================================================================
function EverythingPage({stats, shopify}: {stats: ReturnType<typeof getReviewStats>; shopify: ShopifyEnrichment | null}) {
  const canBuyEverything = !!shopify?.variantId && shopify.availableForSale;
  const bundle = BUNDLES.find((b) => b.slug === 'everything')!;
  const totalPrompts =
    PACKS.reduce((s, p) => s + p.promptCount, 0) +
    AUTHORITY.reduce((s, a) => s + (a.promptCount ?? 0), 0);
  const totalPages =
    GUIDES.reduce((s, g) => s + g.pageCount, 0) +
    AUTHORITY.reduce((s, a) => s + (a.pageCount ?? 0), 0);
  const totalTemplates =
    GUIDES.reduce((s, g) => s + g.templateCount, 0) +
    AUTHORITY.reduce((s, a) => s + (a.templateCount ?? 0), 0);
  const everyProduct = [...PACKS, ...GUIDES, ...AUTHORITY];
  return (
    <main id="main" className="page is-active" data-page="bundle-everything">
      <section className="bundle-hero-v2" style={{padding: '160px 0 96px'}}>
        <div className="bundle-hero-v2-mesh" aria-hidden />
        <div className="bundle-hero-v2-inner">
          <span className="label">The mega bundle · all 20 products</span>
          <h1>
            Everything Promptos makes. <em>One investment.</em>
          </h1>
          <p className="sub">Every prompt pack. Every playbook. Every Authority product. The whole toolkit + the whole map. Done.</p>

          {/* Mosaic of all covers, packs, guides, authority */}
          <div className="cover-stage" aria-hidden style={{height: 360}}>
            {everyProduct.map((p, i) => {
              const items = everyProduct.length;
              const center = (items - 1) / 2;
              const offset = (i - center) * 72;
              const rot = (i - center) * 3.6;
              return (
                <div
                  key={p.id}
                  className="fc"
                  style={{
                    transform: `translateX(${offset}px) rotate(${rot}deg)`,
                    zIndex: 30 - Math.abs(i - center),
                    width: 130,
                  }}
                >
                  {p.type === 'pack' ? (
                    <PackCover pack={p} />
                  ) : p.type === 'guide' ? (
                    <GuideCover guide={p} />
                  ) : (
                    <AuthorityCover product={p} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="reveal">
            <span className="strike">${bundle.individualTotal}</span>
            <span className="arrow">→</span>
            <span className="now">${bundle.priceUSD}</span>
            <span className="save-badge">Save ${bundle.savings}</span>
          </div>

          <div className="actions">
            {canBuyEverything ? (
              <AddToCartButton
                className="btn btn-large btn-cream btn-arrow"
                lines={[{merchandiseId: shopify!.variantId, quantity: 1}]}
                analytics={{products: [{productGid: shopify!.variantId, quantity: 1}]}}
                ariaLabel={`Add Everything Bundle to cart, $${bundle.priceUSD}`}
              >
                Get everything · ${bundle.priceUSD}
              </AddToCartButton>
            ) : (
              <button type="button" className="btn btn-large btn-cream btn-arrow" disabled>
                Currently unavailable
              </button>
            )}
            <a href="#mega-breakdown" className="btn btn-large btn-ghost btn-arrow" style={{color: '#fff'}}>See what's inside</a>
          </div>

          <div style={{marginTop: 18}}>
            <span className="scarcity-line">
              <span className="dot" aria-hidden />
              {scarcityCount('everything')} customers got this bundle this week
            </span>
          </div>
        </div>
      </section>

      <section className="celebration" id="mega-breakdown">
        <SectionFade as="div">
          <div className="num"><AnimatedCounter to={totalPrompts} /> + <AnimatedCounter to={totalPages} /></div>
          <div className="sub">
            <AnimatedCounter to={totalPrompts} /> prompts. <AnimatedCounter to={totalPages} />+ pages. <AnimatedCounter to={totalTemplates} /> templates.
            <br />
            <em style={{fontStyle: 'italic', color: 'var(--promptos-pink)'}}>One toolkit.</em>
          </div>
        </SectionFade>
      </section>

      <section className="bundle-breakdown" style={{paddingTop: 64}}>
        <div className="bundle-breakdown-inner">
          <SectionFade as="div" style={{marginBottom: 24, textAlign: 'center'}}>
            <div className="section-eyebrow">The packs included (7)</div>
          </SectionFade>
          {PACKS.map((p) => (
            <SectionFade key={p.slug} as="div" className="bb-row">
              <div className="bb-cover"><PackCover pack={p} /></div>
              <div className="bb-content">
                <div className="vol">Pack · {p.role}</div>
                <h3>{p.name}.</h3>
                <p>{p.tagline}</p>
                <Link to={`/packs/${p.slug}`} prefetch="intent" className="view-link">View pack →</Link>
              </div>
            </SectionFade>
          ))}

          <SectionFade as="div" style={{margin: '64px 0 24px', textAlign: 'center'}}>
            <div className="section-eyebrow">The Authority products included (3)</div>
          </SectionFade>
          {AUTHORITY.map((a) => (
            <SectionFade key={a.slug} as="div" className="bb-row">
              <div className="bb-cover"><AuthorityCover product={a} /></div>
              <div className="bb-content">
                <div className="vol">Authority · {a.role}</div>
                <h3>{a.name}.</h3>
                <p>{a.tagline}</p>
                <Link to={`/authority/${a.slug}`} prefetch="intent" className="view-link">View product →</Link>
              </div>
            </SectionFade>
          ))}

          <SectionFade as="div" style={{margin: '64px 0 24px', textAlign: 'center'}}>
            <div className="section-eyebrow">The playbooks included (8)</div>
          </SectionFade>
          {GUIDES.map((g) => (
            <SectionFade key={g.slug} as="div" className="bb-row">
              <div className="bb-cover"><GuideCover guide={g} /></div>
              <div className="bb-content">
                <div className="vol">Playbook · {g.role}</div>
                <h3>{g.name}.</h3>
                <p>{g.tagline}</p>
                <Link to={`/guides/${g.slug}`} prefetch="intent" className="view-link">View playbook →</Link>
              </div>
            </SectionFade>
          ))}
        </div>
      </section>

      <section style={{padding: '96px 0', background: 'var(--bone)', borderBlock: '1px solid var(--hairline)'}}>
        <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
          <SectionFade as="div" style={{maxWidth: 760, margin: '0 auto 48px', textAlign: 'center'}}>
            <div className="section-eyebrow">Mega-bundle reviews</div>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.4vw, 56px)', letterSpacing: '-0.02em', lineHeight: 1.05}}>
              The big-buy buyers.
            </h2>
          </SectionFade>
          <ReviewSummary average={stats.average} count={stats.count} distribution={stats.distribution} />
          <div style={{marginTop: 40}}>
            <ReviewGrid initialProductId={bundle.id} hideProductFilter hideProductLink />
          </div>
        </div>
      </section>

      <GuaranteeBlock title="If even one pack pays for the whole thing, the rest is upside." body="Same 30-day refund. Same one-sentence email. Same answer." />
      <FaqV2 />
      <NewsletterCTA />
    </main>
  );
}

// =====================================================================
// /bundles/authority
// =====================================================================
function AuthorityBundlePage({stats, shopify}: {stats: ReturnType<typeof getReviewStats>; shopify: ShopifyEnrichment | null}) {
  const canBuyAuthority = !!shopify?.variantId && shopify.availableForSale;
  const bundle = AUTHORITY_BUNDLE;
  return (
    <main id="main" className="page is-active" data-page="bundle-authority">
      <section className="bundle-hero-v2">
        <div className="bundle-hero-v2-mesh" aria-hidden />
        <div className="bundle-hero-v2-inner">
          <span className="label">The Authority bundle · all 3 products</span>
          <h1>
            Build your audience. <em>Productize your expertise.</em>
          </h1>
          <p className="sub">{bundle.tagline}</p>

          <div className="cover-stage" aria-hidden style={{height: 300}}>
            {AUTHORITY.map((a, i) => (
              <div key={a.slug} className={`fc p${i + 1}`} style={{
                transform: `translateX(${(i - 1) * 200}px) rotate(${(i - 1) * 10}deg)`,
                zIndex: 5 - Math.abs(i - 1),
                width: 180,
              }}>
                <AuthorityCover product={a} />
              </div>
            ))}
          </div>

          <div className="reveal">
            <span className="strike">${bundle.individualTotal}</span>
            <span className="arrow">→</span>
            <span className="now">${bundle.priceUSD}</span>
            <span className="save-badge">Save ${bundle.savings}</span>
          </div>

          <div className="actions">
            {canBuyAuthority ? (
              <AddToCartButton
                className="btn btn-large btn-cream btn-arrow"
                lines={[{merchandiseId: shopify!.variantId, quantity: 1}]}
                analytics={{products: [{productGid: shopify!.variantId, quantity: 1}]}}
                ariaLabel={`Add Authority Bundle to cart, $${bundle.priceUSD}`}
              >
                Get the Authority bundle · ${bundle.priceUSD}
              </AddToCartButton>
            ) : (
              <button type="button" className="btn btn-large btn-cream btn-arrow" disabled>
                Currently unavailable
              </button>
            )}
            <a href="#breakdown" className="btn btn-large btn-ghost btn-arrow" style={{color: '#fff'}}>What's included</a>
          </div>
        </div>
      </section>

      <section className="bundle-breakdown" id="breakdown">
        <div className="bundle-breakdown-inner">
          {AUTHORITY.map((a) => (
            <SectionFade key={a.slug} as="div" className="bb-row">
              <div className="bb-cover"><AuthorityCover product={a} /></div>
              <div className="bb-content">
                <div className="vol">Authority · {a.role}</div>
                <h3>{a.name}.</h3>
                <p>{a.tagline}</p>
                <div className="secs">
                  {a.coverStyle === 'pack' ? (
                    <>
                      <span>{a.promptCount} prompts</span>
                      <span>{a.sections?.length} sections</span>
                      <span>.docx</span>
                    </>
                  ) : (
                    <>
                      <span>{a.pageCount} pages</span>
                      <span>{a.chapterCount} chapters</span>
                      <span>{a.templateCount} templates</span>
                    </>
                  )}
                </div>
                <Link to={`/authority/${a.slug}`} prefetch="intent" className="view-link">View product →</Link>
              </div>
            </SectionFade>
          ))}
        </div>
      </section>

      {/* "Why all three together" */}
      <section className="why-section" style={{padding: '96px 0', background: 'var(--cream)', borderBlock: '1px solid var(--hairline)'}}>
        <div style={{maxWidth: 880, margin: '0 auto', padding: '0 var(--space-5)'}}>
          <SectionFade as="div" style={{textAlign: 'center', marginBottom: 48}}>
            <div className="section-eyebrow">Why all three together</div>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.05}}>
              Strategy. Execution. Monetization. Stacked.
            </h2>
          </SectionFade>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
            <SectionFade as="div" className="why-card">
              <div className="why-icon" style={{color: 'var(--promptos-pink)', fontFamily: 'var(--font-serif)', fontSize: 32}}>1</div>
              <h3>The Playbook gives you the strategy.</h3>
              <p>Positioning, content pillars, platform choice, the consistency system. Ten chapters answer "what to build."</p>
            </SectionFade>
            <SectionFade as="div" className="why-card" delayMs={140}>
              <div className="why-icon" style={{color: 'var(--promptos-pink)', fontFamily: 'var(--font-serif)', fontSize: 32}}>2</div>
              <h3>The Content Engine gives you the daily execution.</h3>
              <p>75 prompts so the daily-content cadence holds for ninety days without burning out.</p>
            </SectionFade>
            <SectionFade as="div" className="why-card" delayMs={280}>
              <div className="why-icon" style={{color: 'var(--promptos-pink)', fontFamily: 'var(--font-serif)', fontSize: 32}}>3</div>
              <h3>The High-Ticket Finder gives you the monetization path.</h3>
              <p>A four-step methodology that turns a two-hour interview into your first $5k+ product.</p>
            </SectionFade>
          </div>
        </div>
      </section>

      <section style={{padding: '96px 0'}}>
        <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
          <SectionFade as="div" style={{maxWidth: 760, margin: '0 auto 48px', textAlign: 'center'}}>
            <div className="section-eyebrow">Early access reviews</div>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.4vw, 56px)', letterSpacing: '-0.02em', lineHeight: 1.05}}>
              What bundle buyers said.
            </h2>
          </SectionFade>
          <ReviewSummary average={stats.average} count={stats.count} distribution={stats.distribution} />
          <div style={{marginTop: 40}}>
            <ReviewGrid initialProductId={bundle.id} hideProductFilter hideProductLink />
          </div>
        </div>
      </section>

      <GuaranteeBlock />
      <BundleSelector heading="Or look at all four bundles." />
      <FaqV2 />
      <NewsletterCTA />
    </main>
  );
}

export function ErrorBoundary() {
  return (
    <main className="notfound">
      <div className="notfound-inner">
        <div className="glitch" aria-hidden>404</div>
        <h1>That bundle doesn't exist.</h1>
        <p>We ship four: Packs, Authority, Guides, Everything. One of those is probably what you meant.</p>
        <div className="actions">
          <a href="/bundles" className="btn btn-large btn-gradient btn-arrow">Compare all bundles</a>
          <a href="/" className="btn btn-large btn-secondary">Home</a>
        </div>
      </div>
    </main>
  );
}
