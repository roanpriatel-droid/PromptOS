import {Link} from 'react-router';
import {useState} from 'react';
import type {Review} from '~/lib/reviews';
import {getProductBySlug} from '~/lib/catalog';
import {RatingStars} from './RatingStars';

const AVATAR_PALETTE = [
  '#6B46C1', '#EC4899', '#C2410C', '#15803D', '#CA8A04',
  '#475569', '#3B1F6B', '#0F766E', '#B91C1C',
];

function colorFor(name: string): string {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xfffffff;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}

function initials(name: string): string {
  const parts = name.replace('.', '').trim().split(/\s+/);
  return parts.length === 1
    ? parts[0].slice(0, 2).toUpperCase()
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function relativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
  if (diffDays < 1) return 'Today';
  if (diffDays < 2) return 'Yesterday';
  if (diffDays < 14) return `${diffDays} days ago`;
  if (diffDays < 60) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString(undefined, {month: 'short', day: 'numeric'});
}

type Props = {
  review: Review;
  /** Hide product link (when card is already on the product's page). */
  hideProduct?: boolean;
};

export function ReviewCard({review, hideProduct}: Props) {
  const [helpful, setHelpful] = useState(review.helpfulCount);
  const [voted, setVoted] = useState(false);
  const product = getProductBySlug(review.productId);
  const productLink = product
    ? product.type === 'pack'
      ? `/packs/${product.slug}`
      : product.type === 'guide'
        ? `/guides/${product.slug}`
        : `/bundles/${product.slug}`
    : null;
  return (
    <article className="review-card">
      <div className="top">
        <div className="who">
          <span className="av" style={{background: colorFor(review.name)}}>
            {initials(review.name)}
          </span>
          <div>
            <div className="name">{review.name}</div>
            <div className="loc">{review.location} · {review.role}</div>
          </div>
        </div>
        <div className="date">{relativeDate(review.date)}</div>
      </div>
      <div className="title-row">
        <RatingStars rating={review.rating} />
        <span className="review-title">{review.title}</span>
      </div>
      <p className="body">{review.body}</p>
      <div className="meta-row">
        <span className="ea-badge">Early Access · Honest Feedback</span>
        {!hideProduct && product && productLink && (
          <Link to={productLink} prefetch="intent" className="product-link">
            {product.name}
          </Link>
        )}
        <button
          type="button"
          className="helpful"
          aria-pressed={voted}
          onClick={() => {
            if (voted) return;
            setHelpful((h) => h + 1);
            setVoted(true);
          }}
        >
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" aria-hidden>
            <path d="M7 11v9H4v-9zM7 11l4-7c1 0 2 .8 2 1.8V9h5a2 2 0 0 1 2 2.4l-1.6 7A2 2 0 0 1 16.5 20H7"
                  stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          Helpful ({helpful})
        </button>
      </div>
    </article>
  );
}
