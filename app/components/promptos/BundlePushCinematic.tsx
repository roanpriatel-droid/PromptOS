import {Link} from 'react-router';
import {BUNDLES, PACKS, GUIDES, AUTHORITY, AUTHORITY_BUNDLE, MEGA_BUNDLE, PACKS_BUNDLE, GUIDES_BUNDLE} from '~/lib/catalog';
import {CATALOG_STATS} from '~/lib/catalog-stats';
import {LaunchDiscountLine} from './LaunchDiscountLine';
import {CoverV39, hasV39Cover} from './CoverV39';
import {PackCover} from './PackCover';
import {GuideCover} from './GuideCover';
import {AuthorityCover} from './AuthorityCover';
import {SectionFade} from './SectionFade';

/**
 * Homepage's full-bleed dark Bundle Push — animated gradient mesh, four
 * large bundle cards in a single row. Everything (mega) elevated with a
 * "Best value" badge and a translateY.
 */
export function BundlePushCinematic() {
  const totalPrompts =
    PACKS.reduce((s, p) => s + p.promptCount, 0) +
    AUTHORITY.reduce((s, a) => s + (a.promptCount ?? 0), 0);
  const totalPages =
    GUIDES.reduce((s, g) => s + g.pageCount, 0) +
    AUTHORITY.reduce((s, a) => s + (a.pageCount ?? 0), 0);

  return (
    <section className="bundle-push-cinematic" data-perf-pause="bpc-mesh">
      <div className="bundle-push-cinematic-mesh" aria-hidden />
      <div className="bundle-push-cinematic-inner">
        <SectionFade as="div" className="bundle-push-cinematic-head">
          <span className="label">The bundles</span>
          <h2>
            Four scopes. <em>One stack.</em>
          </h2>
          <p>
            Buy a single product if you&apos;re certain. Buy a bundle when you want the toolkit,
            the audience system, or the playbook on the same desktop. Save up to ${MEGA_BUNDLE.savings}.
          </p>
        </SectionFade>

        <div className="bundle-cinematic-grid bundle-cinematic-grid-4">
          {/* Packs */}
          <SectionFade as="div" delayMs={0}>
            <Link to={`/bundles/${PACKS_BUNDLE.slug}`} prefetch="intent" className="cinematic-card">
              {hasV39Cover(PACKS_BUNDLE.slug) ? (
                <div className="stack" aria-hidden style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{width: '100%', maxWidth: 280, aspectRatio: '1 / 1', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--v39a-elevation-raised)'}}>
                    <CoverV39 slug={PACKS_BUNDLE.slug} alt={PACKS_BUNDLE.name} />
                  </div>
                </div>
              ) : (
                <div className="stack" aria-hidden>
                  {PACKS.slice(0, 5).map((p, i) => (
                    <div
                      key={p.slug}
                      className="mini"
                      style={{
                        left: `${i * 16}px`,
                        transform: `rotate(${(i - 2) * 3}deg)`,
                        zIndex: 10 - i,
                      }}
                    >
                      <PackCover pack={p} />
                    </div>
                  ))}
                </div>
              )}
              <div className="meta">
                <div className="kicker">For daily tools</div>
                <h3>{PACKS_BUNDLE.name}</h3>
                <p className="desc">All {CATALOG_STATS.totalPacks} packs · {CATALOG_STATS.promptsFromPacks} prompts · save ${PACKS_BUNDLE.savings}.</p>
                <div className="price-row">
                  <span className="price">${PACKS_BUNDLE.priceUSD}</span>
                  <span className="strike">${PACKS_BUNDLE.individualTotal}</span>
                </div>
                <LaunchDiscountLine priceUSD={PACKS_BUNDLE.priceUSD} />
                <span className="cta">Get the packs <span aria-hidden>→</span></span>
              </div>
            </Link>
          </SectionFade>

          {/* Authority */}
          <SectionFade as="div" delayMs={100}>
            <Link to={`/bundles/${AUTHORITY_BUNDLE.slug}`} prefetch="intent" className="cinematic-card">
              {hasV39Cover(AUTHORITY_BUNDLE.slug) ? (
                <div className="stack" aria-hidden style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{width: '100%', maxWidth: 280, aspectRatio: '1 / 1', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--v39a-elevation-raised)'}}>
                    <CoverV39 slug={AUTHORITY_BUNDLE.slug} alt={AUTHORITY_BUNDLE.name} />
                  </div>
                </div>
              ) : (
                <div className="stack" aria-hidden>
                  {AUTHORITY.map((a, i) => (
                    <div
                      key={a.slug}
                      className="mini"
                      style={{
                        left: `${i * 22}px`,
                        transform: `rotate(${(i - 1) * 5}deg)`,
                        zIndex: 10 - i,
                      }}
                    >
                      <AuthorityCover product={a} />
                    </div>
                  ))}
                </div>
              )}
              <div className="meta">
                <div className="kicker">For audience &amp; product</div>
                <h3>{AUTHORITY_BUNDLE.name}</h3>
                <p className="desc">All 3 Authority products · save ${AUTHORITY_BUNDLE.savings}.</p>
                <div className="price-row">
                  <span className="price">${AUTHORITY_BUNDLE.priceUSD}</span>
                  <span className="strike">${AUTHORITY_BUNDLE.individualTotal}</span>
                </div>
                <LaunchDiscountLine priceUSD={AUTHORITY_BUNDLE.priceUSD} />
                <span className="cta">Get Authority <span aria-hidden>→</span></span>
              </div>
            </Link>
          </SectionFade>

          {/* Mega (elevated) */}
          <SectionFade as="div" delayMs={200}>
            <Link to={`/bundles/${MEGA_BUNDLE.slug}`} prefetch="intent" className="cinematic-card win">
              <span className="badge">Best value</span>
              {hasV39Cover(MEGA_BUNDLE.slug) ? (
                <div className="stack" aria-hidden style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{width: '100%', maxWidth: 320, aspectRatio: '1 / 1', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--v39a-elevation-raised)'}}>
                    <CoverV39 slug={MEGA_BUNDLE.slug} alt={MEGA_BUNDLE.name} />
                  </div>
                </div>
              ) : (
                <div className="stack" aria-hidden>
                  {[...PACKS.slice(0, 2), AUTHORITY[0], AUTHORITY[2], ...GUIDES.slice(0, 3)].map((p, i) => (
                    <div
                      key={p.slug}
                      className="mini"
                      style={{
                        left: `${i * 12}px`,
                        transform: `rotate(${(i - 3) * 2.5}deg)`,
                        zIndex: 20 - i,
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
                  ))}
                </div>
              )}
              <div className="meta">
                <div className="kicker">All {CATALOG_STATS.totalProductsPublicClaim} products</div>
                <h3>{MEGA_BUNDLE.name}</h3>
                <p className="desc">
                  Every pack + Authority + playbook. {totalPrompts} prompts + {totalPages}+ pages. Save ${MEGA_BUNDLE.savings}.
                </p>
                <div className="price-row">
                  <span className="price">${MEGA_BUNDLE.priceUSD}</span>
                  <span className="strike">${MEGA_BUNDLE.individualTotal}</span>
                </div>
                <LaunchDiscountLine priceUSD={MEGA_BUNDLE.priceUSD} light />
                <span className="cta">Get everything <span aria-hidden>→</span></span>
              </div>
            </Link>
          </SectionFade>

          {/* Guides */}
          <SectionFade as="div" delayMs={300}>
            <Link to={`/bundles/${GUIDES_BUNDLE.slug}`} prefetch="intent" className="cinematic-card">
              {hasV39Cover(GUIDES_BUNDLE.slug) ? (
                <div className="stack" aria-hidden style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{width: '100%', maxWidth: 280, aspectRatio: '1 / 1', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--v39a-elevation-raised)'}}>
                    <CoverV39 slug={GUIDES_BUNDLE.slug} alt={GUIDES_BUNDLE.name} />
                  </div>
                </div>
              ) : (
                <div className="stack" aria-hidden>
                  {GUIDES.slice(0, 5).map((g, i) => (
                    <div
                      key={g.slug}
                      className="mini"
                      style={{
                        left: `${i * 16}px`,
                        transform: `rotate(${(i - 2) * 3}deg)`,
                        zIndex: 10 - i,
                      }}
                    >
                      <GuideCover guide={g} />
                    </div>
                  ))}
                </div>
              )}
              <div className="meta">
                <div className="kicker">For the business</div>
                <h3>{GUIDES_BUNDLE.name}</h3>
                <p className="desc">All 8 playbooks · {totalPages}+ pages · save ${GUIDES_BUNDLE.savings}.</p>
                <div className="price-row">
                  <span className="price">${GUIDES_BUNDLE.priceUSD}</span>
                  <span className="strike">${GUIDES_BUNDLE.individualTotal}</span>
                </div>
                <LaunchDiscountLine priceUSD={GUIDES_BUNDLE.priceUSD} />
                <span className="cta">Get the guides <span aria-hidden>→</span></span>
              </div>
            </Link>
          </SectionFade>
        </div>

        <p className="bundle-push-cinematic-foot">
          {totalPrompts} prompts · {totalPages}+ pages · lifetime updates on every product.
        </p>
      </div>
    </section>
  );
}
