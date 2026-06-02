import type {Route} from './+types/authority._index';
import {Link} from 'react-router';
import {AUTHORITY, AUTHORITY_BUNDLE} from '~/lib/catalog';
import {AuthorityCard} from '~/components/promptos/AuthorityCard';
import {AuthorityCover} from '~/components/promptos/AuthorityCover';
import {SectionFade} from '~/components/promptos/SectionFade';
import {BundleSelector} from '~/components/promptos/BundleSelector';
import {JsonLd, itemListSchema, SITE_URL} from '~/components/promptos/JsonLd';

export const meta: Route.MetaFunction = () => [
  {title: 'Authority · Promptos'},
  {
    name: 'description',
    content:
      'Three products. One mission: turn your expertise into a brand people pay for. Build an audience, ship daily content, productize for high-ticket revenue.',
  },
];

export default function AuthorityIndex() {
  return (
    <main id="main" className="page is-active" data-page="authority-index">
      <JsonLd
        data={itemListSchema({
          name: 'Promptos Authority Products',
          items: AUTHORITY.map((a) => ({
            name: a.name,
            url: `${SITE_URL}/authority/${a.slug}`,
            description: a.tagline,
          })),
        })}
      />
      <section className="catalog-hero">
        <SectionFade as="div" className="catalog-hero-inner">
          <span className="label section-eyebrow">Authority</span>
          <h1>Build an audience. Build a product. Build a business.</h1>
          <p>
            Three products. One mission: turn your expertise into a brand people pay for.
            The strategy, the daily execution, and the monetization, three tools that line up.
          </p>
        </SectionFade>
      </section>

      <section className="catalog-body">
        <div className="catalog-body-inner">
          <div className="guides-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
            {AUTHORITY.map((a) => (
              <SectionFade key={a.slug} as="div">
                <AuthorityCard product={a} />
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* Authority bundle push */}
      <section className="bundle-push-cinematic">
        <div className="bundle-push-cinematic-mesh" aria-hidden />
        <div className="bundle-push-cinematic-inner">
          <SectionFade as="div" className="bundle-push-cinematic-head">
            <span className="label">The Authority Bundle</span>
            <h2>All three. <em>One price.</em></h2>
            <p>
              The strategy + the daily content + the monetization path. Save ${AUTHORITY_BUNDLE.savings}{' '}
              when you take the full stack.
            </p>
          </SectionFade>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto'}}>
            {AUTHORITY.map((a) => (
              <SectionFade key={a.slug} as="div" style={{aspectRatio: '4/5', borderRadius: 12, overflow: 'hidden', boxShadow: '0 24px 60px -18px rgba(0,0,0,0.45)'}}>
                <AuthorityCover product={a} />
              </SectionFade>
            ))}
          </div>

          <div style={{textAlign: 'center', marginTop: 40}}>
            <div className="price-reveal" style={{display: 'inline-flex', alignItems: 'baseline', gap: 18, marginBottom: 28}}>
              <span style={{textDecoration: 'line-through', color: 'rgba(255,255,255,0.5)', fontSize: 24}}>
                ${AUTHORITY_BUNDLE.individualTotal}
              </span>
              <span style={{color: 'rgba(255,255,255,0.55)', fontSize: 24}}>→</span>
              <span style={{fontFamily: 'var(--font-serif)', fontSize: 56, letterSpacing: '-0.04em', color: 'var(--paper)'}}>
                ${AUTHORITY_BUNDLE.priceUSD}
              </span>
              <span className="save-badge" style={{background: 'var(--promptos-pink)', color: 'var(--paper)', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em'}}>
                Save ${AUTHORITY_BUNDLE.savings}
              </span>
            </div>
            <div className="actions" style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
              <Link to="/bundles/authority" prefetch="intent" className="btn btn-large btn-cream btn-arrow">
                Get the Authority Bundle
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BundleSelector heading="Or look at all four bundles." />
    </main>
  );
}
