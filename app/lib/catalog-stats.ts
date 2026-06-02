/**
 * v3.9c-tactical — single source of truth for catalog stats.
 *
 * Every number on the site that previously could drift between
 * "430 prompts / 450 prompts / 535 prompts" or "600 pages / 1,080
 * pages / 1,220 pages" now reads from this module. The values are
 * COMPUTED from the live catalog + reviews data at module-load —
 * not hardcoded — so they cannot drift again.
 *
 * If you add a new pack / playbook / Authority product or change a
 * promptCount / pageCount, this file requires no edit; the next
 * build picks it up.
 */

import {AUTHORITY, BUNDLES, GUIDES, PACKS} from './catalog';
import {REVIEWS} from './reviews';

// ---------- Catalog tallies ----------

const totalPacks = PACKS.length;
const totalPlaybooks = GUIDES.length;
const totalAuthority = AUTHORITY.length;
const totalBundles = BUNDLES.length;

// Total individual products (the "20 products" claim is roughly this).
// Excludes bundles — bundles are wrappers around products, not products
// themselves in user copy.
const totalSingleProducts = totalPacks + totalPlaybooks + totalAuthority;

// Total prompts across the corpus:
//   - every pack's promptCount
//   - every Authority product's promptCount (Content Engine ships
//     prompts; the others may have a `promptCount` field for hybrid
//     content like the High-Ticket Finder which mixes pages + prompts)
const promptsFromPacks = PACKS.reduce((sum, p) => sum + p.promptCount, 0);
const promptsFromAuthority = AUTHORITY.reduce(
  (sum, a) => sum + (a.promptCount ?? 0),
  0,
);
const totalPrompts = promptsFromPacks + promptsFromAuthority;

// Total pages across the corpus:
//   - every playbook's pageCount
//   - every Authority product's pageCount (Personal Brand + High-Ticket
//     Finder are page-shaped; Content Engine is prompt-shaped, no pages)
const pagesFromPlaybooks = GUIDES.reduce((sum, g) => sum + g.pageCount, 0);
const pagesFromAuthority = AUTHORITY.reduce(
  (sum, a) => sum + (a.pageCount ?? 0),
  0,
);
// Pages from playbooks only (the "1,080+ pages of playbooks" claim).
const totalPlaybookPages = pagesFromPlaybooks;
// All pages including Authority page-shaped products.
const totalCorpusPages = pagesFromPlaybooks + pagesFromAuthority;

// Total templates across playbooks (the "100+ templates" claim if
// anyone makes one).
const totalPlaybookTemplates = GUIDES.reduce(
  (sum, g) => sum + (g.templateCount ?? 0),
  0,
);

// ---------- Review tallies ----------

const totalReviews = REVIEWS.length;
const ratingSum = REVIEWS.reduce((s, r) => s + r.rating, 0);
const avgRating =
  totalReviews > 0 ? Math.round((ratingSum / totalReviews) * 10) / 10 : 0;

// ---------- Public export ----------

export const CATALOG_STATS = {
  // Catalog counts
  totalPacks,
  totalPlaybooks,
  totalAuthority,
  totalBundles,
  totalSingleProducts, // 7 + 8 + 3 = 18
  totalBuyableUnits: totalSingleProducts + totalBundles, // 22
  /**
   * "20 products" is the legacy public claim. Computed = 18. We expose
   * both so callers can choose the precise number for the surface they
   * write. New copy should use `totalSingleProducts`; existing
   * "20 products" call sites stay legible by reading this constant.
   */
  totalProductsPublicClaim: totalSingleProducts,

  // Content tallies
  totalPrompts,           // sum of pack + authority promptCount
  totalPlaybookPages,     // sum of playbook pageCount
  totalCorpusPages,       // sum of playbook + authority pageCount
  totalPlaybookTemplates,

  // Per-class breakdowns (for callers that need granularity)
  promptsFromPacks,
  promptsFromAuthority,
  pagesFromPlaybooks,
  pagesFromAuthority,

  // Reviews
  totalReviews,
  avgRating,
} as const;

export type CatalogStats = typeof CATALOG_STATS;
