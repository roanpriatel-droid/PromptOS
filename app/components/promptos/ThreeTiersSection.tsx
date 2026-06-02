import {Link} from 'react-router';
import {SectionFade} from './SectionFade';
import {AUTHORITY, GUIDES, PACKS} from '~/lib/catalog';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

/**
 * "Three Tiers of the Promptos System" — frames the 18 products as a
 * single progression from daily tools → audience → business.
 */
export function ThreeTiersSection() {
  const packsLow = Math.min(...PACKS.map((p) => p.priceUSD));
  const packsHigh = Math.max(...PACKS.map((p) => p.priceUSD));
  const authorityLow = Math.min(...AUTHORITY.map((a) => a.priceUSD));
  const authorityHigh = Math.max(...AUTHORITY.map((a) => a.priceUSD));
  const guidesLow = Math.min(...GUIDES.map((g) => g.priceUSD));
  const guidesHigh = Math.max(...GUIDES.map((g) => g.priceUSD));

  return (
    <section className="three-tiers v39a-section">
      {/* v3.9b D2 — horizontal pink → purple gradient hint via orb pair */}
      <GradientOrb color="pink" intensity="soft" size={460} top="20%" left="-6%" />
      <GradientOrb color="purple" intensity="soft" size={520} top="40%" right="-8%" />
      <NoiseTexture />
      <div className="three-tiers-inner">
        <SectionFade as="div" className="three-tiers-head">
          <div className="section-eyebrow">The Promptos system</div>
          <h2>
            Three tiers. <em>One progression.</em>
          </h2>
          <p>The catalog isn't a pile of products, it's a stack. Pick the tier that matches where you are now; upgrade when the work changes.</p>
        </SectionFade>

        <div className="tiers-grid">
          <SectionFade as="div" className="tier-card tier-1 v39a-hover-lift" delayMs={0}>
            <div className="tier-badge">Tier 1</div>
            <div className="tier-price">${packsLow}–${packsHigh}</div>
            <h3>Daily execution.</h3>
            <p className="tier-desc">Prompt packs for the work you ship every day, briefs, copy, email, code review, planning.</p>
            <ul className="tier-list">
              <li>The Marketer&apos;s Pack</li>
              <li>The AI Power User Pack</li>
              <li>5 more</li>
            </ul>
            <Link to="/packs" prefetch="intent" className="tier-cta">
              View packs <span aria-hidden>→</span>
            </Link>
          </SectionFade>

          <SectionFade as="div" className="tier-card tier-2 v39a-hover-lift" delayMs={140}>
            <div className="tier-badge tier-badge-mid">Tier 2 · New</div>
            <div className="tier-price">${authorityLow}–${authorityHigh}</div>
            <h3>Audience &amp; authority.</h3>
            <p className="tier-desc">Strategy, daily content, and a high-ticket product methodology. Three tools that turn expertise into revenue.</p>
            <ul className="tier-list">
              <li>The Personal Brand Playbook</li>
              <li>The Content Engine Pack</li>
              <li>The High-Ticket Product Finder</li>
            </ul>
            <Link to="/authority" prefetch="intent" className="tier-cta">
              View Authority <span aria-hidden>→</span>
            </Link>
          </SectionFade>

          <SectionFade as="div" className="tier-card tier-3 v39a-hover-lift v39a-hover-lift-strong" delayMs={280}>
            <div className="tier-badge">Tier 3</div>
            <div className="tier-price">${guidesLow}–${guidesHigh}</div>
            <h3>Build a business.</h3>
            <p className="tier-desc">Eight playbooks for the businesses operators are actually starting, agencies, SaaS, coaching, productized solo.</p>
            <ul className="tier-list">
              <li>The AI Automation Agency Playbook</li>
              <li>The Digital Products Playbook</li>
              <li>6 more</li>
            </ul>
            <Link to="/guides" prefetch="intent" className="tier-cta">
              View playbooks <span aria-hidden>→</span>
            </Link>
          </SectionFade>
        </div>

        <p className="three-tiers-foot">
          Each tier compounds the previous. Most operators land on two; the heaviest users pair packs + Authority + one playbook.
        </p>
      </div>
    </section>
  );
}
