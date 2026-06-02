import {Link} from 'react-router';
import {GUIDES, GUIDES_BUNDLE} from '~/lib/catalog';
import {GuideCard} from './GuideCard';
import {SectionFade} from './SectionFade';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

/**
 * Homepage guides strip — same card pattern as /guides but no filters,
 * plus a banner CTA to the guides bundle.
 */
export function GuideHomeStrip() {
  // v3.9c-tactical fix: this strip is the homepage's GUIDES bundle CTA.
  // Previously it pulled BUNDLES[1] (the Authority Bundle) which made
  // the CTA "Get the guides bundle · $249" link to /bundles/authority
  // at the wrong price. Now explicitly references GUIDES_BUNDLE.
  const bundle = GUIDES_BUNDLE;
  return (
    <section className="packs-v2 v39a-section" id="guides-home">
      {/* v3.9b D5 — playbooks lean pink-dominant (higher-ticket energy) */}
      <GradientOrb color="pink" intensity="soft" size={520} top="15%" left="-8%" />
      <GradientOrb color="pink" intensity="soft" size={440} bottom="20%" right="-6%" />
      <NoiseTexture />
      <SectionFade as="div" className="packs-v2-head">
        <div className="section-eyebrow">The playbooks</div>
        <h2>One finished plan. Per business.</h2>
        <p>Eight playbooks for the businesses operators are actually building this year.</p>
      </SectionFade>

      <div className="guides-grid" style={{maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--space-5)'}}>
        {GUIDES.map((g, i) => (
          <SectionFade key={g.slug} as="div" delayMs={i * 55}>
            <div className="v39a-hover-lift v39a-hover-lift-strong">
              <GuideCard guide={g} />
            </div>
          </SectionFade>
        ))}
      </div>

      <SectionFade as="div">
        <div className="packs-banner v39a-hover-lift" style={{background: 'var(--ink-deep)'}}>
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
