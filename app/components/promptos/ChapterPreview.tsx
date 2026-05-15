import {Link} from 'react-router';
import type {Guide} from '~/lib/catalog';
import {SectionFade} from './SectionFade';

export function ChapterPreview({guide}: {guide: Guide}) {
  const more = guide.chapterCount - 1;
  return (
    <section className="chapter-preview">
      <div className="chapter-preview-inner">
        <SectionFade as="div" className="chapter-preview-head">
          <div className="section-eyebrow label">A real chapter from the book</div>
          <h2>See exactly what you&apos;re reading.</h2>
        </SectionFade>

        <SectionFade as="article" className="chapter-preview-card">
          <div className="ch">Chapter {guide.sample.number}</div>
          <h3 className="title">{guide.sample.title}</h3>
          <p className="intro">{guide.sample.intro}</p>
          <ul>
            {guide.sample.keyPoints.map((k) => <li key={k}>{k}</li>)}
          </ul>
          <p className="close">{guide.sample.closeNote}</p>
        </SectionFade>

        <p className="chapter-preview-more">
          +{more} more chapters inside.{' '}
          <Link to={`/products/${guide.shopifyHandle}`} prefetch="intent">
            Get {guide.name} · ${guide.priceUSD} →
          </Link>
        </p>
      </div>
    </section>
  );
}
