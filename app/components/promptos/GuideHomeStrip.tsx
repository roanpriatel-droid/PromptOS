import {Link} from 'react-router';
import {GUIDES, BUNDLES} from '~/lib/catalog';
import {GuideCard} from './GuideCard';
import {SectionFade} from './SectionFade';

/**
 * Homepage guides strip — same card pattern as /guides but no filters,
 * plus a banner CTA to the guides bundle.
 */
export function GuideHomeStrip() {
  const bundle = BUNDLES[1];
  return (
    <section className="packs-v2" id="guides-home">
      <SectionFade as="div" className="packs-v2-head">
        <div className="section-eyebrow">The playbooks</div>
        <h2>One finished plan. Per business.</h2>
        <p>Eight playbooks for the businesses operators are actually building this year.</p>
      </SectionFade>

      <div className="guides-grid" style={{maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--space-5)'}}>
        {GUIDES.map((g) => (
          <SectionFade key={g.slug} as="div">
            <GuideCard guide={g} />
          </SectionFade>
        ))}
      </div>

      <SectionFade as="div">
        <div className="packs-banner" style={{background: 'var(--ink-deep)'}}>
          <div className="copy">
            <strong>Or get all 8 playbooks, save ${bundle.savings}</strong>
            <p>Every playbook. Lifetime updates. New playbooks free.</p>
          </div>
          <Link
            to={`/bundles/${bundle.slug}`}
            prefetch="intent"
            className="btn btn-cream btn-large btn-arrow"
            style={{whiteSpace: 'nowrap'}}
          >
            Get the guides bundle · ${bundle.priceUSD}
          </Link>
        </div>
      </SectionFade>
    </section>
  );
}
