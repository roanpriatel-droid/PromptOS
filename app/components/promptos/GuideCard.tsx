import {Link} from 'react-router';
import type {Guide} from '~/lib/catalog';
import {getReviewStats} from '~/lib/reviews';
import {GuideCover} from './GuideCover';
import {RatingStars} from './RatingStars';

export function GuideCard({guide}: {guide: Guide}) {
  const stats = getReviewStats(guide.id);
  // 3 representative chapter highlights — pick a spread (early, mid, late)
  // so the bullets show range, not just openers.
  const total = guide.chapters.length;
  const picks = [1, Math.floor(total / 2), total - 1].filter(
    (idx, i, arr) => arr.indexOf(idx) === i && idx < total && idx >= 0,
  );
  const highlights = picks.map((idx) => {
    const c = guide.chapters[idx];
    return `Chapter ${c.number}: ${c.name}`;
  });
  return (
    <Link
      to={`/guides/${guide.slug}`}
      prefetch="intent"
      className="guide-card v2-card-clickable"
      aria-label={`${guide.name}, ${stats.count} reviews, $${guide.priceUSD}`}
    >
      <div className="cover">
        <GuideCover guide={guide} />
      </div>
      <div className="meta">
        <div className="vol">Vol. {guide.number} · {guide.role}</div>
        <div className="name">{guide.name}</div>
        <p className="promise">{guide.tagline}</p>
        <ul className="card-highlights">
          {highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <div className="card-rating">
          <RatingStars rating={stats.average} />
          <span className="card-rating-text">
            <strong>{stats.average.toFixed(1)}</strong>
            <span className="card-rating-count">·  {stats.count} reviews</span>
          </span>
        </div>
        <div className="stats">
          <span>{guide.pageCount} pages</span>
          <span>·</span>
          <span>{guide.chapterCount} chapters</span>
          <span>·</span>
          <span>{guide.templateCount} templates</span>
        </div>
        <div className="card-divider" aria-hidden />
        <div className="footer-row">
          <span className="price">${guide.priceUSD} USD</span>
          <span className="view">View playbook →</span>
        </div>
      </div>
    </Link>
  );
}
