import {useSearchParams} from 'react-router';
import {useMemo} from 'react';
import type {Route} from './+types/packs._index';
import {PACKS} from '~/lib/catalog';
import {Link} from 'react-router';
import {PackCover} from '~/components/promptos/PackCover';
import {SectionFade} from '~/components/promptos/SectionFade';
import {BundleSelector} from '~/components/promptos/BundleSelector';
import {RatingStars} from '~/components/promptos/RatingStars';
import {getReviewStats} from '~/lib/reviews';
import {ProductFilters, PACK_FILTERS, filterPacks} from '~/components/promptos/ProductFilters';

export const meta: Route.MetaFunction = () => [
  {title: 'Prompt Packs · Promptos'},
  {
    name: 'description',
    content:
      'Seven battle-tested prompt packs for the work you already do. 430 prompts across marketing, writing, code, business operations, and AI workflows.',
  },
];

export default function PacksIndex() {
  const [params] = useSearchParams();
  const packs = useMemo(() => filterPacks(PACKS, params), [params]);

  return (
    <main id="main" className="page is-active" data-page="packs-index">
      <section className="catalog-hero">
        <SectionFade as="div" className="catalog-hero-inner">
          <span className="label section-eyebrow">Prompt Packs</span>
          <h1>Battle-tested prompts. Built for specific jobs.</h1>
          <p>
            Seven packs, 430 prompts. Each pack solves one job: marketing, writing, code, business
            operations, AI workflows. All prompts ship as editable .docx and work with every major model.
          </p>
        </SectionFade>
      </section>

      <section className="catalog-body">
        <div className="catalog-body-inner">
          <ProductFilters slots={PACK_FILTERS} />
          {packs.length === 0 ? (
            <p style={{textAlign: 'center', color: 'var(--fg-3)', padding: '48px 0'}}>
              No packs match these filters. Clear them to see all seven.
            </p>
          ) : (
            <div className="guides-grid">
              {packs.map((pack) => {
                const stats = getReviewStats(pack.id);
                return (
                  <Link
                    key={pack.slug}
                    to={`/packs/${pack.slug}`}
                    prefetch="intent"
                    className="guide-card v2-card-clickable"
                    data-tone={pack.tone}
                  >
                    <div className="cover">
                      <PackCover pack={pack} />
                    </div>
                    <div className="meta">
                      <div className="vol">Vol. {pack.number} · {pack.role}</div>
                      <div className="name">{pack.name}</div>
                      <p className="promise">{pack.tagline}</p>
                      <div className="card-rating">
                        <RatingStars rating={stats.average} />
                        <span className="card-rating-text">
                          <strong>{stats.average.toFixed(1)}</strong>
                          <span className="card-rating-count">·  {stats.count} reviews</span>
                        </span>
                      </div>
                      <div className="stats">
                        <span>{pack.promptCount} prompts</span>
                        <span>·</span>
                        <span>{pack.sections.length} sections</span>
                        <span>·</span>
                        <span>.docx</span>
                      </div>
                      <div className="card-divider" aria-hidden />
                      <div className="footer-row">
                        <span className="price">${pack.priceUSD}</span>
                        <span className="view">View pack →</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <BundleSelector heading="Save by bundling." />
    </main>
  );
}
