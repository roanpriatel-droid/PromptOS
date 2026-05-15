import type {Guide} from '~/lib/catalog';
import {SectionFade} from './SectionFade';

export function RoadmapTimeline({guide}: {guide: Guide}) {
  return (
    <section className="roadmap">
      <div className="roadmap-inner">
        <SectionFade as="div" className="roadmap-head">
          <div className="section-eyebrow">The 90-day roadmap</div>
          <h2>Day 1 to first client, mapped.</h2>
          <p>The same roadmap our early-access buyers used. No vague "in a few months", actual checkpoints.</p>
        </SectionFade>

        <div className="roadmap-grid">
          {guide.roadmap.map((m, i) => (
            <SectionFade key={m.day} as="div" className="roadmap-step" delayMs={i * 80}>
              <div className="dot">
                <span className="day">Day {m.day}</span>
              </div>
              <h4>{m.title}</h4>
              <p>{m.detail}</p>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}
