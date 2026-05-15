import {useMemo} from 'react';
import {useSearchParams} from 'react-router';
import {GUIDES} from '~/lib/catalog';
import {GuideCard} from './GuideCard';
import {ProductFilters, GUIDE_FILTERS, filterGuides} from './ProductFilters';

/**
 * Guides index grid with URL-backed filters. Replaces the earlier in-memory
 * filter state — now shareable via URL params.
 */
export function GuideGrid() {
  const [params] = useSearchParams();
  const guides = useMemo(() => filterGuides(GUIDES, params), [params]);

  return (
    <>
      <ProductFilters slots={GUIDE_FILTERS} />
      {guides.length === 0 ? (
        <p style={{textAlign: 'center', color: 'var(--fg-3)', padding: '48px 0'}}>
          No playbooks match these filters. Clear them to see all eight.
        </p>
      ) : (
        <div className="guides-grid">
          {guides.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      )}
    </>
  );
}
