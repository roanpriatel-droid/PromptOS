import {Link} from 'react-router';
import type {Pack} from '~/lib/packs';
import {PackCover} from './PackCover';
import {SectionFade} from './SectionFade';

export function RelatedPacksV2({packs}: {packs: Pack[]}) {
  return (
    <section className="packs-v2" style={{paddingTop: 80, paddingBottom: 120}}>
      <SectionFade as="div" className="packs-v2-head">
        <div className="section-eyebrow">You might also like</div>
        <h2>Other packs in the series.</h2>
      </SectionFade>
      <div className="packs-v2-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
        {packs.map((pack, i) => (
          <SectionFade key={pack.slug} as="div" delayMs={i * 80}>
            <Link
              to={`/packs/${pack.slug}`}
              prefetch="intent"
              className="v2-card"
              data-tone={pack.tone}
            >
              <div className="cover">
                <PackCover pack={pack} />
              </div>
              <div className="meta">
                <div className="name">{pack.name}</div>
                <div className="aud">{pack.role}</div>
                <div className="footer-row">
                  <span>{pack.promptCount} prompts</span>
                  <span className="price">${pack.priceUSD}</span>
                </div>
                <div className="view-cta">
                  View pack <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          </SectionFade>
        ))}
      </div>
    </section>
  );
}
