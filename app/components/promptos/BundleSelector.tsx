import {Link} from 'react-router';
import {BUNDLES} from '~/lib/catalog';
import {SectionFade} from './SectionFade';

const COPY: Record<string, {desc: string; bullets: string[]; cta: string}> = {
  packs: {
    desc: 'Every prompt pack in one library. Your daily-driver AI toolkit.',
    bullets: [
      'All 7 prompt packs',
      '430 prompts across 42 working sections',
      'Editable .docx + PDF',
      'Lifetime updates',
    ],
    cta: 'Get the packs bundle',
  },
  authority: {
    desc: 'Build your audience. Productize your expertise. The strategy, the daily content, the monetization, together.',
    bullets: [
      'The Personal Brand Playbook ($147)',
      'The Content Engine Pack ($39)',
      'The High-Ticket Product Finder ($97)',
      'Save $34 vs. buying separately',
    ],
    cta: 'Get the Authority bundle',
  },
  guides: {
    desc: 'Every playbook in one library. Pick a business model and run it.',
    bullets: [
      'All 8 business playbooks',
      '600+ pages across 96 chapters',
      '90 templates included',
      'Lifetime updates + new playbooks free',
    ],
    cta: 'Get the guides bundle',
  },
  everything: {
    desc: 'All 20 products. Daily prompts + Authority products + every playbook for every business.',
    bullets: [
      'All 7 packs + all 8 guides + all 3 Authority products',
      '535 prompts + 1,230 pages + 96 templates',
      'Pair every playbook with the matching pack',
      'Lifetime updates on every product',
    ],
    cta: 'Get everything',
  },
};

export function BundleSelector({heading = 'Three bundles. Pick your scope.'}: {heading?: string}) {
  return (
    <section className="bundle-compare">
      <div className="bundle-compare-inner">
        <SectionFade as="div" className="bundle-compare-head">
          <div className="section-eyebrow">Bundles</div>
          <h2>{heading}</h2>
          <p>Buy what matches your situation. Upgrade later if you want, we credit the difference.</p>
        </SectionFade>

        <div className="bundle-compare-grid bundle-compare-grid-4">
          {BUNDLES.map((b, i) => {
            const isWin = b.slug === 'everything';
            const copy = COPY[b.slug];
            return (
              <SectionFade key={b.slug} as="div" delayMs={i * 80}>
                <Link
                  to={`/bundles/${b.slug}`}
                  prefetch="intent"
                  className={`bundle-compare-card${isWin ? ' win' : ''}`}
                >
                  {isWin && <span className="badge">Best value</span>}
                  <h3 className="name">{b.name}</h3>
                  <div className="price-line">
                    <span className="price">${b.priceUSD}</span>
                    <span className="strike">${b.individualTotal}</span>
                    <span className="save">save ${b.savings}</span>
                  </div>
                  <p className="desc">{copy.desc}</p>
                  <ul>
                    {copy.bullets.map((bul) => <li key={bul}>{bul}</li>)}
                  </ul>
                  <span className="cta">{copy.cta} <span aria-hidden>→</span></span>
                </Link>
              </SectionFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
