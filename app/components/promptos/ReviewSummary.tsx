import {RatingStars} from './RatingStars';
import {RatingDistribution} from './RatingDistribution';

type Props = {
  average: number;
  count: number;
  distribution: readonly [number, number, number, number, number];
};

export function ReviewSummary({average, count, distribution}: Props) {
  return (
    <div className="review-summary">
      <div>
        <div className="big">{average.toFixed(1)}</div>
        <RatingStars rating={average} size="l" />
        <p className="count">
          {count.toLocaleString()} early-access {count === 1 ? 'review' : 'reviews'}
        </p>
      </div>
      <RatingDistribution distribution={distribution} total={count} />
    </div>
  );
}
