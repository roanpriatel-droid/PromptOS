import {RatingStars} from './RatingStars';

type Props = {
  /** Five values, 5★ first → 1★ last. */
  distribution: readonly [number, number, number, number, number];
  total: number;
};

export function RatingDistribution({distribution, total}: Props) {
  const safeTotal = Math.max(1, total);
  return (
    <div className="review-distribution">
      {distribution.map((count, idx) => {
        const stars = 5 - idx;
        const pct = (count / safeTotal) * 100;
        return (
          <div key={stars} className="row">
            <span>{stars}★</span>
            <div className="bar">
              <span style={{width: `${pct}%`}} />
            </div>
            <span>{count}</span>
          </div>
        );
      })}
      <span className="sr-only">
        <RatingStars rating={5} label={`Distribution across ${total} reviews`} />
      </span>
    </div>
  );
}
