import {Link} from 'react-router';
import {SectionFade} from './SectionFade';
import {MEGA_BUNDLE, PACKS, GUIDES} from '~/lib/catalog';

/**
 * The homepage's pivotal "Two Sides of the Same Goal" section.
 * Packs (pink) for daily-driver tools, Guides (purple) for the long-arc
 * business question. Middle column has its own divider + button CTA up to
 * the mega bundle.
 */
export function TwoSidesSection() {
  const totalPrompts = PACKS.reduce((s, p) => s + p.promptCount, 0);
  const totalPages = GUIDES.reduce((s, g) => s + g.pageCount, 0);
  return (
    <section className="two-sides">
      <div className="two-sides-inner">
        <SectionFade as="div" className="two-sides-card packs">
          <span className="label">Prompt Packs</span>
          <h3>For the work you do every day.</h3>
          <p>
            Seven packs, {totalPrompts} prompts. Sharper briefs, faster copy, better email,
            cleaner code review, without writing prompts from scratch.
          </p>
          <ul>
            <li>Faster outputs across Claude, ChatGPT, Gemini.</li>
            <li>Built for specific jobs, not generic "be more productive."</li>
            <li>Pay once. Edit. Fork. Ship.</li>
          </ul>
          <Link to="/packs" prefetch="intent" className="cta">Browse the packs →</Link>
        </SectionFade>

        <SectionFade as="div" className="two-sides-divider" delayMs={140}>
          <div className="two-sides-divider-line" aria-hidden />
          <div className="two-sides-divider-inner">
            <span className="two-sides-or">Or both</span>
            <div className="two-sides-arrow two-sides-arrow-down" aria-hidden>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <Link
              to={`/bundles/${MEGA_BUNDLE.slug}`}
              prefetch="intent"
              className="two-sides-cta two-sides-cta-stacked"
              aria-label={`Everything Bundle, $${MEGA_BUNDLE.priceUSD} USD, save $${MEGA_BUNDLE.savings}`}
            >
              <span className="two-sides-cta-eyebrow">Everything Bundle</span>
              <span className="two-sides-cta-priceLarge">${MEGA_BUNDLE.priceUSD}</span>
            </Link>
            <span className="two-sides-save-badge">Save ${MEGA_BUNDLE.savings}</span>
          </div>
          <div className="two-sides-divider-line" aria-hidden />
        </SectionFade>

        <SectionFade as="div" className="two-sides-card guides" delayMs={120}>
          <span className="label">Playbooks</span>
          <h3>For the business you want to build.</h3>
          <p>
            Eight playbooks, {totalPages}+ pages. Real positioning, real templates, real numbers.
            Written by operators who actually ran the business.
          </p>
          <ul>
            <li>One finished plan, not eighty videos.</li>
            <li>Templates: cold emails, contracts, decks, scripts, calculators.</li>
            <li>90-day roadmap. Day 1 to first client.</li>
          </ul>
          <Link to="/guides" prefetch="intent" className="cta">Browse the playbooks →</Link>
        </SectionFade>
      </div>
    </section>
  );
}
