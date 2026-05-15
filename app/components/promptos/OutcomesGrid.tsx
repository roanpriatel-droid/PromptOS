import {SectionFade} from './SectionFade';

export function OutcomesGrid({title, outcomes}: {title: string; outcomes: string[]}) {
  return (
    <section className="outcomes">
      <div className="outcomes-inner">
        <SectionFade as="div" className="outcomes-head">
          <div className="section-eyebrow">What you&apos;ll be able to do</div>
          <h2>{title}</h2>
          <p>Real outcomes, not "feelings of confidence."</p>
        </SectionFade>

        <div className="outcomes-grid">
          {outcomes.map((line, i) => (
            <SectionFade key={line} as="div" className="outcome" delayMs={i * 50}>
              <div className="ic" aria-hidden>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                  <path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p>{line}</p>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}
