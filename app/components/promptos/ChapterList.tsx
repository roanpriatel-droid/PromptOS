import type {Guide} from '~/lib/catalog';
import {SectionFade} from './SectionFade';

export function ChapterList({guide}: {guide: Guide}) {
  return (
    <section className="chapters">
      <div className="chapters-inner">
        <SectionFade as="div" className="chapters-head">
          <div className="section-eyebrow">What&apos;s inside</div>
          <h2>{guide.chapterCount} chapters. {guide.pageCount} pages. No filler.</h2>
          <p>Each chapter is a working piece of the operating system, written so you can execute on it the same day.</p>
        </SectionFade>
        <div className="chapters-list">
          {guide.chapters.map((c, i) => (
            <SectionFade key={c.number} as="div" className="chapter-card" delayMs={i * 30}>
              <div className="num" aria-hidden>{c.number}</div>
              <div className="ch">Chapter {c.number}</div>
              <h4>{c.name}</h4>
              <p>{c.description}</p>
              <div className="pages">{c.pageCount} pages</div>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}
