import {SectionFade} from './SectionFade';
import type {Pack} from '~/lib/packs';

export function WhoForV2({pack}: {pack: Pack}) {
  return (
    <section className="whofor-v2">
      <div className="whofor-v2-inner">
        <SectionFade as="div">
          <div className="section-eyebrow">Who this pack is for</div>
          <h2>
            Built for{' '}
            {pack.role.replace(/^For /i, '').toLowerCase()} who ship.
          </h2>
        </SectionFade>

        <div className="whofor-list">
          {pack.whoFor.map((line, i) => (
            <SectionFade key={line} as="div" className="whofor-item" delayMs={i * 70}>
              <span className="check" aria-hidden>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                  <path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p>{line}</p>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}
