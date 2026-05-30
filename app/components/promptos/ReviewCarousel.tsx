import {Link} from 'react-router';
import {REVIEWS, getReviewStats} from '~/lib/reviews';
import {ReviewCard} from './ReviewCard';
import {RatingStars} from './RatingStars';
import {ReviewsTransparencyLine} from './ReviewsTransparencyLine';

/**
 * Auto-scrolling review carousel for the homepage. Hand-picks 24 strong
 * reviews and duplicates them so the marquee loop is seamless.
 */
export function ReviewCarousel() {
  const top = REVIEWS.filter((r) => r.rating === 5 && r.body.length >= 80).slice(0, 24);
  const stats = getReviewStats();
  return (
    <section className="review-carousel">
      <div className="review-carousel-inner">
        <div className="review-carousel-head">
          <div>
            <ReviewsTransparencyLine />
            <div className="section-eyebrow">Early access reviews</div>
            <h2>1,000+ buyers said it worked.</h2>
            <p className="sub">From our pre-launch group. Honest feedback in exchange for products.</p>
          </div>
          <div style={{textAlign: 'right'}}>
            <RatingStars rating={stats.average} size="xl" />
            <div style={{marginTop: 8, fontSize: 14, color: 'var(--fg-3)'}}>
              <strong style={{color: 'var(--ink)', fontFamily: 'var(--font-serif)', fontSize: 22, marginRight: 6}}>
                {stats.average.toFixed(1)}
              </strong>
              from {stats.count.toLocaleString()} reviews
            </div>
            <Link to="/reviews" prefetch="intent" className="text-link" style={{fontSize: 13, marginTop: 6, display: 'inline-block'}}>
              Read all reviews →
            </Link>
          </div>
        </div>
      </div>
      <div className="review-track-wrap">
        <div className="review-track">
          {[...top, ...top].map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
