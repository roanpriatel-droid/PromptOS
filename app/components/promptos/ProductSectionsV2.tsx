import type {Pack} from '~/lib/packs';
import {SectionFade} from './SectionFade';

export function ProductSectionsV2({pack}: {pack: Pack}) {
  return (
    <section className="sections-v2">
      <SectionFade as="div" className="sections-v2-head">
        <div className="section-eyebrow">What&apos;s inside</div>
        <h2>
          {pack.sections.length} sections, {pack.promptCount} prompts,
          organized by job.
        </h2>
        <p>Every prompt has a title, a use case, a copy-pasteable body, an example output, and a pro tip.</p>
      </SectionFade>

      <div className="sections-v2-grid">
        {pack.sections.map((s, i) => (
          <SectionFade key={s.name} as="div" className="section-card-v2" delayMs={i * 80}>
            <div className="num-ghost" aria-hidden>{s.number}</div>
            <div className="name">{s.name}</div>
            <div className="count">{s.promptCount} prompts</div>
            <div className="desc">{s.description}</div>
            <ul className="samples">
              {s.sampleTitles.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </SectionFade>
        ))}
      </div>
    </section>
  );
}
