import {ALL_PRODUCTS} from '~/lib/catalog';

export type ReviewFilterState = {
  productId: 'all' | string;
  rating: 'all' | 1 | 2 | 3 | 4 | 5;
  sort: 'helpful' | 'recent' | 'highest' | 'lowest';
};

type Props = {
  state: ReviewFilterState;
  onChange: (next: ReviewFilterState) => void;
};

export function ReviewFilters({state, onChange}: Props) {
  return (
    <div className="review-filters">
      <select
        value={state.productId}
        onChange={(e) => onChange({...state, productId: e.target.value})}
        aria-label="Filter by product"
      >
        <option value="all">All products</option>
        <optgroup label="Packs">
          {ALL_PRODUCTS.filter((p) => p.type === 'pack').map((p) => (
            <option key={p.slug} value={p.id}>{p.name}</option>
          ))}
        </optgroup>
        <optgroup label="Guides">
          {ALL_PRODUCTS.filter((p) => p.type === 'guide').map((p) => (
            <option key={p.slug} value={p.id}>{p.name}</option>
          ))}
        </optgroup>
        <optgroup label="Bundles">
          {ALL_PRODUCTS.filter((p) => p.type === 'bundle').map((p) => (
            <option key={p.slug} value={p.id}>{p.name}</option>
          ))}
        </optgroup>
      </select>

      <select
        value={String(state.rating)}
        onChange={(e) => {
          const v = e.target.value;
          onChange({...state, rating: v === 'all' ? 'all' : (Number(v) as 1 | 2 | 3 | 4 | 5)});
        }}
        aria-label="Filter by rating"
      >
        <option value="all">All ratings</option>
        <option value="5">5 stars only</option>
        <option value="4">4 stars only</option>
        <option value="3">3 stars only</option>
        <option value="2">2 stars only</option>
        <option value="1">1 star only</option>
      </select>

      <select
        value={state.sort}
        onChange={(e) => onChange({...state, sort: e.target.value as ReviewFilterState['sort']})}
        aria-label="Sort"
      >
        <option value="helpful">Most helpful</option>
        <option value="recent">Most recent</option>
        <option value="highest">Highest rating</option>
        <option value="lowest">Lowest rating</option>
      </select>
    </div>
  );
}
