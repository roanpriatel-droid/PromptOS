import type {Route} from './+types/reviews';
import {SectionFade} from '~/components/promptos/SectionFade';
import {ReviewSummary} from '~/components/promptos/ReviewSummary';
import {ReviewGrid} from '~/components/promptos/ReviewGrid';
import {getReviewStats, TOTAL_REVIEWS} from '~/lib/reviews';
import {AnimatedCounter} from '~/components/promptos/AnimatedCounter';

export const meta: Route.MetaFunction = () => [
  {title: `${TOTAL_REVIEWS.toLocaleString()}+ Reviews · Promptos`},
  {
    name: 'description',
    content:
      'Honest reviews from our early-access program. Filter by product, rating, recency. The good, the bad, the meh, we kept them all.',
  },
];

export default function ReviewsPage() {
  const stats = getReviewStats();
  return (
    <main id="main" className="page is-active" data-page="reviews">
      <section className="catalog-hero">
        <SectionFade as="div" className="catalog-hero-inner">
          <span className="label section-eyebrow">Reviews</span>
          <h1>
            <AnimatedCounter to={stats.count} suffix="+" /> early-access reviews.
          </h1>
          <p>
            Honest feedback from buyers in our pre-launch program, they received the products in
            exchange for a review, and we kept everything they wrote.
          </p>
          <p className="reviews-disclosure">
            These reviews are from buyers in our early-access program who received the products in
            exchange for honest feedback. We've kept the good, the bad, and the "meh."
          </p>
        </SectionFade>
      </section>

      <section style={{padding: '40px 0 24px'}}>
        <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
          <SectionFade as="div">
            <ReviewSummary
              average={stats.average}
              count={stats.count}
              distribution={stats.distribution}
            />
          </SectionFade>
        </div>
      </section>

      <section style={{padding: '40px 0 120px'}}>
        <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
          <ReviewGrid />
        </div>
      </section>
    </main>
  );
}
