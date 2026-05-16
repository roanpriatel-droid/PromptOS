import {Link} from 'react-router';
import type {Authority} from '~/lib/catalog';
import {getReviewStats} from '~/lib/reviews';
import {AuthorityCover} from './AuthorityCover';
import {RatingStars} from './RatingStars';

export function AuthorityCard({product}: {product: Authority}) {
  const stats = getReviewStats(product.id);
  const stats_str = product.coverStyle === 'pack'
    ? `${product.promptCount} prompts · ${product.sections?.length ?? 0} sections · .docx`
    : `${product.pageCount} pages · ${product.chapterCount} chapters · ${product.templateCount} templates`;

  let highlights: string[] = [];
  if (product.coverStyle === 'pack' && product.sections) {
    highlights = product.sections
      .slice(0, 3)
      .map((s) => `${s.promptCount} ${s.name.toLowerCase()} prompts`);
  } else if (product.chapters) {
    const total = product.chapters.length;
    const picks = [1, Math.floor(total / 2), total - 1].filter(
      (idx, i, arr) => arr.indexOf(idx) === i && idx < total && idx >= 0,
    );
    highlights = picks.map((idx) => {
      const c = product.chapters![idx];
      return `Chapter ${c.number}: ${c.name}`;
    });
  }

  return (
    <Link
      to={`/authority/${product.slug}`}
      prefetch="intent"
      className="guide-card v2-card-clickable"
      aria-label={`${product.name}, ${stats.count} reviews, $${product.priceUSD}`}
    >
      <div className="cover">
        <AuthorityCover product={product} />
      </div>
      <div className="meta">
        <div className="vol">Authority · {product.role}</div>
        <div className="name">{product.name}</div>
        <p className="promise">{product.tagline}</p>
        {highlights.length > 0 && (
          <ul className="card-highlights">
            {highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        )}
        <hr className="card-pink-divider" aria-hidden />
        <p className="card-best-for">
          <span className="card-best-for-label">Best for:</span>{product.audience}
        </p>
        <div className="card-rating">
          <RatingStars rating={stats.average} />
          <span className="card-rating-text">
            <strong>{stats.average.toFixed(1)}</strong>
            <span className="card-rating-count">·  {stats.count} reviews</span>
          </span>
        </div>
        <div className="stats" style={{fontSize: 11}}>{stats_str}</div>
        <div className="card-divider" aria-hidden />
        <div className="footer-row">
          <span className="price">${product.priceUSD} USD</span>
          <span className="view">View →</span>
        </div>
      </div>
    </Link>
  );
}
