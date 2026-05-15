import {Link} from 'react-router';
import {SectionFade} from './SectionFade';
import {BUNDLES, PACKS, GUIDES, AUTHORITY} from '~/lib/catalog';

/**
 * Horizontal bundle-comparison table. Lives on /bundles below the card row.
 * Numbers are computed from the catalog so it stays in sync.
 */
export function CompareBundlesTable() {
  const totalPromptsAll =
    PACKS.reduce((s, p) => s + p.promptCount, 0) +
    AUTHORITY.reduce((s, a) => s + (a.promptCount ?? 0), 0);
  const totalPagesAuthority = AUTHORITY.reduce((s, a) => s + (a.pageCount ?? 0), 0);
  const totalPagesGuides = GUIDES.reduce((s, g) => s + g.pageCount, 0);
  const totalPagesAll = totalPagesGuides + totalPagesAuthority;
  const promptsAuthority = AUTHORITY.reduce((s, a) => s + (a.promptCount ?? 0), 0);

  const rows: Array<[string, string | number, string | number, string | number, string | number]> = [
    ['Prompt packs included', 7, 1, 0, 7],
    ['Authority products', 0, 3, 0, 3],
    ['Playbooks included', 0, 0, 8, 8],
    ['Total prompts', 430, promptsAuthority, 0, totalPromptsAll],
    ['Total pages', 0, `${totalPagesAuthority}+`, `${totalPagesGuides}+`, `${totalPagesAll}+`],
    ['Individual value', '$253', `$${BUNDLES[1].individualTotal}`, `$${BUNDLES[2].individualTotal}`, `$${BUNDLES[3].individualTotal}`],
    ['Bundle price', `$${BUNDLES[0].priceUSD}`, `$${BUNDLES[1].priceUSD}`, `$${BUNDLES[2].priceUSD}`, `$${BUNDLES[3].priceUSD}`],
    ['You save', `$${BUNDLES[0].savings}`, `$${BUNDLES[1].savings}`, `$${BUNDLES[2].savings}`, `$${BUNDLES[3].savings}`],
    ['Best for', 'Daily users', 'Audience builders', 'Business builders', 'Everyone'],
  ];

  return (
    <section className="bundle-compare-table-section">
      <div className="bundle-compare-table-inner">
        <SectionFade as="div" className="bundle-compare-table-head">
          <div className="section-eyebrow">Side by side</div>
          <h2>Compare the four bundles.</h2>
          <p>Same catalog, four scopes. The numbers below come from the live catalog data.</p>
        </SectionFade>

        <SectionFade as="div" className="bundle-compare-table-wrap">
          <table className="bundle-compare-table">
            <thead>
              <tr>
                <th scope="col" className="row-label-col">Feature</th>
                <th scope="col">Packs Bundle</th>
                <th scope="col" className="col-authority">Authority Bundle</th>
                <th scope="col">Guides Bundle</th>
                <th scope="col" className="col-best">Everything Bundle</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  <td>{row[1]}</td>
                  <td className="col-authority">{row[2]}</td>
                  <td>{row[3]}</td>
                  <td className="col-best">{row[4]}</td>
                </tr>
              ))}
              <tr className="cta-row">
                <th scope="row" aria-hidden></th>
                <td>
                  <Link to="/bundles/packs" prefetch="intent" className="bundle-table-cta">
                    Get bundle <span aria-hidden>→</span>
                  </Link>
                </td>
                <td className="col-authority">
                  <Link to="/bundles/authority" prefetch="intent" className="bundle-table-cta">
                    Get bundle <span aria-hidden>→</span>
                  </Link>
                </td>
                <td>
                  <Link to="/bundles/guides" prefetch="intent" className="bundle-table-cta">
                    Get bundle <span aria-hidden>→</span>
                  </Link>
                </td>
                <td className="col-best">
                  <Link to="/bundles/everything" prefetch="intent" className="bundle-table-cta bundle-table-cta-best">
                    Get everything <span aria-hidden>→</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </SectionFade>

        <p className="bundle-compare-disclaimer">
          Bundle prices reflect 30-day money-back guarantee. All products delivered instantly via download link.
        </p>
      </div>
    </section>
  );
}
