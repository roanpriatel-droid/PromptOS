/**
 * Backwards-compatibility shim. New code imports from ~/lib/catalog.
 *
 * Keeps the old names alive so the existing pack/bundle components don't
 * have to be touched in a single sweep:
 *   - `BUNDLE`               → re-export of `PACKS_BUNDLE`
 *   - `SAVE_VS_INDIVIDUAL`   → `PACKS_BUNDLE.savings`
 *   - `getRelatedPacks(slug)`→ pack-typed filter over cross-sell + siblings
 *
 * Types `Pack`, `PackSection`, `PackTone`, `SamplePrompt` re-export
 * verbatim from catalog.
 */

import {PACKS, PACKS_BUNDLE, CROSS_SELL, getPackBySlug as _getPackBySlug, type Pack} from './catalog';

export {PACKS, PACKS_BUNDLE as BUNDLE} from './catalog';
export {getPackBySlug} from './catalog';
export type {Pack, PackSection, PackTone, SamplePrompt} from './catalog';

export const SAVE_VS_INDIVIDUAL = PACKS_BUNDLE.savings;

export function getRelatedPacks(slug: string, count = 3): Pack[] {
  const pairs = CROSS_SELL[slug] ?? [];
  const paired = pairs
    .map((id) => PACKS.find((p) => p.id === id))
    .filter((p): p is Pack => Boolean(p));
  if (paired.length >= count) return paired.slice(0, count);
  const idx = PACKS.findIndex((p) => p.slug === slug);
  const ordered = idx >= 0
    ? [...PACKS.slice(idx + 1), ...PACKS.slice(0, idx)]
    : [...PACKS];
  const seen = new Set(paired.map((p) => p.id));
  const siblings = ordered.filter((p) => !seen.has(p.id));
  return [...paired, ...siblings].slice(0, count);
}

// Tiny helper used by the old bundle component to find a pack by slug.
export function lookupPack(slug: string): Pack | undefined {
  return _getPackBySlug(slug);
}
