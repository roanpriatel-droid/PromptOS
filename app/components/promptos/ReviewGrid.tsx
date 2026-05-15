import {useMemo, useState} from 'react';
import {ReviewFilters, type ReviewFilterState} from './ReviewFilters';
import {ReviewCard} from './ReviewCard';
import {REVIEWS, type Review} from '~/lib/reviews';

const PAGE = 20;

type Props = {
  /** Default product filter — used on product pages to scope to that product. */
  initialProductId?: string;
  hideProductFilter?: boolean;
  hideProductLink?: boolean;
};

export function ReviewGrid({initialProductId, hideProductFilter, hideProductLink}: Props) {
  const [state, setState] = useState<ReviewFilterState>({
    productId: initialProductId ?? 'all',
    rating: 'all',
    sort: 'helpful',
  });
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo<Review[]>(() => {
    let list = REVIEWS;
    if (state.productId !== 'all') list = list.filter((r) => r.productId === state.productId);
    if (state.rating !== 'all') list = list.filter((r) => r.rating === state.rating);
    if (state.sort === 'helpful') list = [...list].sort((a, b) => b.helpfulCount - a.helpfulCount);
    if (state.sort === 'recent') list = [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
    if (state.sort === 'highest') list = [...list].sort((a, b) => b.rating - a.rating || b.helpfulCount - a.helpfulCount);
    if (state.sort === 'lowest') list = [...list].sort((a, b) => a.rating - b.rating);
    return list;
  }, [state]);

  return (
    <>
      {!hideProductFilter && <ReviewFilters state={state} onChange={(s) => { setState(s); setVisible(PAGE); }} />}
      <div className="review-grid">
        {filtered.slice(0, visible).map((r) => (
          <ReviewCard key={r.id} review={r} hideProduct={hideProductLink} />
        ))}
      </div>
      {visible < filtered.length && (
        <div className="load-more-row">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setVisible((v) => v + PAGE)}
          >
            Load more · {filtered.length - visible} remaining
          </button>
        </div>
      )}
      {filtered.length === 0 && (
        <p style={{textAlign: 'center', color: 'var(--fg-3)', padding: '40px 0'}}>
          No reviews match these filters yet.
        </p>
      )}
    </>
  );
}
