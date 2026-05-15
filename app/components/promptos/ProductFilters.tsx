import {useSearchParams} from 'react-router';

/**
 * Generic URL-backed filter bar used on /packs and /guides.
 *
 * Each "slot" is one <select>. The state lives in the URL (`?sort=...`),
 * so filtered views are shareable + back-button-friendly. Default values
 * are omitted from the URL.
 */

export type FilterOption = {value: string; label: string};
export type FilterSlot = {
  key: string;            // URL param key
  label: string;          // <label> text (visually hidden but accessible)
  defaultValue: string;   // value treated as "no filter"
  options: FilterOption[];
};

type Props = {
  slots: FilterSlot[];
};

export function ProductFilters({slots}: Props) {
  const [params, setParams] = useSearchParams();

  function setSlot(key: string, value: string, defaultValue: string) {
    const next = new URLSearchParams(params);
    if (value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, {preventScrollReset: true, replace: true});
  }

  return (
    <div className="product-filters">
      {slots.map((slot) => {
        const current = params.get(slot.key) ?? slot.defaultValue;
        return (
          <label key={slot.key} className="product-filter">
            <span className="sr-only">{slot.label}</span>
            <select
              value={current}
              onChange={(e) => setSlot(slot.key, e.target.value, slot.defaultValue)}
              aria-label={slot.label}
            >
              {slot.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        );
      })}
    </div>
  );
}

// =====================================================================
// Filter slot definitions per index page
// =====================================================================

export const PACK_FILTERS: FilterSlot[] = [
  {
    key: 'sort',
    label: 'Sort by',
    defaultValue: 'popular',
    options: [
      {value: 'popular', label: 'Most popular'},
      {value: 'newest', label: 'Newest'},
      {value: 'price-asc', label: 'Price: low to high'},
      {value: 'price-desc', label: 'Price: high to low'},
    ],
  },
  {
    key: 'audience',
    label: 'Audience',
    defaultValue: 'all',
    options: [
      {value: 'all', label: 'All audiences'},
      {value: 'marketer', label: 'Marketers'},
      {value: 'writer', label: 'Writers'},
      {value: 'developer', label: 'Developers'},
      {value: 'solopreneur', label: 'Founders'},
      {value: 'content-creator', label: 'Creators'},
      {value: 'ai-power-user', label: 'Power users'},
      {value: 'productivity', label: 'Knowledge workers'},
    ],
  },
  {
    key: 'price',
    label: 'Price range',
    defaultValue: 'all',
    options: [
      {value: 'all', label: 'All prices'},
      {value: 'under-30', label: 'Under $30'},
      {value: '30-40', label: '$30 to $40'},
    ],
  },
];

export const GUIDE_FILTERS: FilterSlot[] = [
  {
    key: 'sort',
    label: 'Sort by',
    defaultValue: 'popular',
    options: [
      {value: 'popular', label: 'Most popular'},
      {value: 'newest', label: 'Newest'},
      {value: 'price-asc', label: 'Price: low to high'},
      {value: 'price-desc', label: 'Price: high to low'},
    ],
  },
  {
    key: 'category',
    label: 'Category',
    defaultValue: 'all',
    options: [
      {value: 'all', label: 'All categories'},
      {value: 'agency', label: 'Agency models'},
      {value: 'solo', label: 'Solo models'},
      {value: 'premium', label: 'Premium models'},
    ],
  },
  {
    key: 'price',
    label: 'Price range',
    defaultValue: 'all',
    options: [
      {value: 'all', label: 'All prices'},
      {value: 'under-100', label: 'Under $100'},
      {value: '100-150', label: '$100 to $150'},
      {value: '150-plus', label: '$150 and up'},
    ],
  },
];

// =====================================================================
// Pure filter helpers — used by the index routes
// =====================================================================

import type {Pack, Guide} from '~/lib/catalog';
import {getReviewStats} from '~/lib/reviews';

export function filterPacks(packs: Pack[], params: URLSearchParams): Pack[] {
  let out = [...packs];
  const audience = params.get('audience') ?? 'all';
  const price = params.get('price') ?? 'all';
  const sort = params.get('sort') ?? 'popular';

  if (audience !== 'all') out = out.filter((p) => p.slug === audience);
  if (price === 'under-30') out = out.filter((p) => p.priceUSD < 30);
  if (price === '30-40') out = out.filter((p) => p.priceUSD >= 30 && p.priceUSD <= 40);

  if (sort === 'price-asc') out.sort((a, b) => a.priceUSD - b.priceUSD);
  if (sort === 'price-desc') out.sort((a, b) => b.priceUSD - a.priceUSD);
  if (sort === 'newest') out.sort((a, b) => b.number.localeCompare(a.number));
  if (sort === 'popular') {
    out.sort((a, b) => {
      const ar = getReviewStats(a.id);
      const br = getReviewStats(b.id);
      return br.count - ar.count;
    });
  }
  return out;
}

export function filterGuides(guides: Guide[], params: URLSearchParams): Guide[] {
  let out = [...guides];
  const category = params.get('category') ?? 'all';
  const price = params.get('price') ?? 'all';
  const sort = params.get('sort') ?? 'popular';

  if (category !== 'all') out = out.filter((g) => g.category === category);
  if (price === 'under-100') out = out.filter((g) => g.priceUSD < 100);
  if (price === '100-150') out = out.filter((g) => g.priceUSD >= 100 && g.priceUSD <= 150);
  if (price === '150-plus') out = out.filter((g) => g.priceUSD > 150);

  if (sort === 'price-asc') out.sort((a, b) => a.priceUSD - b.priceUSD);
  if (sort === 'price-desc') out.sort((a, b) => b.priceUSD - a.priceUSD);
  if (sort === 'newest') out.sort((a, b) => b.number.localeCompare(a.number));
  if (sort === 'popular') {
    out.sort((a, b) => {
      const ar = getReviewStats(a.id);
      const br = getReviewStats(b.id);
      return br.count - ar.count;
    });
  }
  return out;
}
