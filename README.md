# Promptos Storefront

Headless commerce front-end for **Promptos** — a digital prompt-and-playbook brand. Built on Hydrogen 2025 (Shopify's React framework, now powered by React Router 7 — the merged Remix) and deployed to Shopify Oxygen.

The brand currently sells **22 products**: 7 prompt packs (.docx, $29–$39), 8 playbook guides (PDF, $97–$197), 3 Authority products (PDF / .docx / mixed, $39–$147), and 4 bundles ($99 Packs / $249 Authority / $497 Guides / $798 Everything).

## Stack

- **Hydrogen** `2026.4.x` (Shopify's React commerce framework)
- **React Router 7** for routing and data
- **Tailwind CSS v4** for utility classes; bulk of styling is named CSS in `app/styles/promptos*.css`
- **TypeScript**, **Vite**, **Shopify CLI**
- **Mock.shop** backend out of the box (swap for your real Shopify storefront when ready)
- **Fonts:** Fraunces (display serif), Inter (sans), JetBrains Mono — loaded via Google Fonts

## Project structure

```
app/
  components/
    promptos/
      # Cover SVGs
      Wordmark.tsx, PackCover.tsx, GuideCover.tsx, BundleCover.tsx
      # Homepage
      HeroV2.tsx                  ← typewriter rotor + 7 floating covers (packs+guides)
      MarqueeStrip.tsx
      TwoSidesSection.tsx         ← packs (pink) vs guides (purple) explainer
      WhyPromptos.tsx             ← 3 cards
      HowItWorks.tsx              ← Pick / Download / Apply
      PackGridV2.tsx              ← 4+3 pack grid + inline bundle row
      GuideHomeStrip.tsx          ← 8-guide grid + bundle banner
      ThreePathsComparison.tsx    ← Course / DIY / Playbook
      ReviewCarousel.tsx          ← marquee of 24 5-star reviews
      BundleSelector.tsx          ← three side-by-side bundles
      WhoEditorial.tsx
      MethodEditorial.tsx
      FounderNote.tsx
      FaqV2.tsx
      NewsletterCTA.tsx
      # Pack pages
      ProductHeroV2.tsx, ProductSectionsV2.tsx, SamplePromptFull.tsx
      WhoForV2.tsx, WhatYouGet.tsx, RelatedPacksV2.tsx
      # Guide pages
      GuideCard.tsx, GuideGrid.tsx
      WhoForWhoNotFor.tsx
      ChapterList.tsx, ChapterPreview.tsx
      OutcomesGrid.tsx, TemplateShowcase.tsx, RoadmapTimeline.tsx
      # Bundle pages — composed inline in routes/bundles.$slug.tsx
      # Reviews
      RatingStars.tsx, RatingDistribution.tsx, ReviewSummary.tsx
      ReviewCard.tsx, ReviewFilters.tsx, ReviewGrid.tsx
      # Cross-cutting
      MegaMenuPanel.tsx           ← 3 dropdown variants
      GuaranteeBlock.tsx
      PairWith.tsx                ← pack ↔ guide cross-sell
      StickyPurchaseBar.tsx       ← slides up on product pages
      AnimatedCounter.tsx         ← number-counter on scroll-in
      SectionFade.tsx             ← Intersection-observer fade wrapper
      icons.tsx                   ← inline Lucide-style icons
    Header.tsx                    ← v3 nav, 3 mega-menus + mobile drawer
    Footer.tsx                    ← 5-column dark footer
    ...                           ← scaffold pieces: PageLayout, Aside, Cart, Search
  lib/
    catalog.ts                    ← SOURCE OF TRUTH — 17 products + cross-sell map
    reviews.ts                    ← 1,192 generated reviews
    packs.ts                      ← shim re-exporting from catalog for old call sites
    fragments.ts, session.ts, context.ts
  routes/
    _index.tsx                    ← upgraded homepage
    packs._index.tsx, packs.$slug.tsx
    guides._index.tsx, guides.$slug.tsx
    bundles._index.tsx, bundles.$slug.tsx
    why-promptos.tsx, reviews.tsx
    about.tsx, method.tsx, contact.tsx
    license.tsx, privacy.tsx, refunds.tsx, updates.tsx
    $.tsx                         ← branded 404 via root ErrorBoundary
    products.$handle.tsx, cart.tsx, account.*, ...  ← Shopify-backed routes
  styles/
    promptos.css                  ← original design hand-off (tokens + base)
    promptos-v2.css               ← flagship rebuild (motion, hero v2, etc.)
    promptos-v3.css               ← v3 additions (mega-menus, guide pages, reviews, 3 paths, two-sides)
    tailwind.css                  ← Tailwind utility layer with brand @theme
    app.css                       ← scaffold cart/search aside chrome
scripts/
  extract-design.mjs              ← extract HTML from Claude design hand-off
  extract-css.mjs                 ← split CSS out of bundle
  generate-reviews.mjs            ← regenerate reviews.ts from templates
```

## Site map

| URL | What's there |
|---|---|
| `/` | Homepage — HeroV2 → Two Sides → Why → How → Packs grid → Guides grid → 3 Paths → Bundle selector → Reviews carousel → Who → Method → Founder → FAQ → Newsletter |
| `/packs` | Pack catalog (all 7 cards + bundle selector) |
| `/packs/$slug` | Pack detail (hero + reviews summary + sections + sample prompt + who-for + what-you-get + full reviews + guarantee + pair-with-a-playbook + related + sticky purchase bar) |
| `/authority` | Authority index — 3 products + Authority Bundle push |
| `/authority/$slug` | Authority product detail (dispatches to pack-style or guide-style by `coverStyle`) |
| `/guides` | Playbook catalog (filterable by category/sort) |
| `/guides/$slug` | Playbook detail (hero + who-for/not-for + 3 Paths + 12-chapter list + chapter preview + outcomes + templates + 90-day roadmap + per-product reviews + guarantee + pair-with-a-pack + sticky purchase bar) |
| `/bundles` | Bundle catalog (4-card compare + by-the-numbers strip) |
| `/bundles/packs` | Packs Bundle ($99) page — hero, breakdown, 430 counter, reviews, FAQ |
| `/bundles/authority` | Authority Bundle ($249) page — hero, breakdown, strategy/execution/monetization explainer, reviews, FAQ |
| `/bundles/guides` | Guides Bundle ($497) page — hero, breakdown, 600+ pages counter, reviews, FAQ |
| `/bundles/everything` | Mega Bundle ($798) page — 18-cover mosaic, full breakdown (packs + Authority + playbooks), reviews, FAQ |
| `/why-promptos` | Long-form essay: Course Trap / DIY Trap / Playbook Approach |
| `/reviews` | 1,407 reviews with summary, filters (product/rating/sort), pagination |
| `/about` | Editorial: founder story + Playbooks expansion section |
| `/method` | Methodology: 5 principles for prompts + 4 for playbooks |
| `/contact` | Contact form with floating labels + success state |
| `/license`, `/privacy`, `/refunds`, `/updates` | Legal + changelog |
| `/<anything else>` | Branded 404 with gradient glitch number |

## Data layer

**`app/lib/catalog.ts`** is the single source of truth for every product on the site. Exports:

```ts
PACKS: Pack[]              // 7 prompt packs
GUIDES: Guide[]            // 8 playbooks
BUNDLES: Bundle[]          // 3 bundles in declaration order
PACKS_BUNDLE, GUIDES_BUNDLE, MEGA_BUNDLE   // named exports for each bundle
ALL_PRODUCTS: AnyProduct[]
CROSS_SELL: Record<slug, slug[]>           // pack ↔ guide pair-with map

getAllProducts(), getPacks(), getGuides(), getBundles()
getProductBySlug(slug), getPackBySlug(slug), getGuideBySlug(slug), getBundleBySlug(slug)
getRelatedProducts(slug, count = 3)        // uses cross-sell map + same-type fallback
getPairWithSuggestions(slug)               // pure cross-sell, no fallback

TOTAL_PROMPTS, TOTAL_PAGES, TOTAL_TEMPLATES, TOTAL_PRODUCTS
```

Each product carries everything the storefront needs: tagline, description, cover styling (`tone`, `color`, `glyph`, `italic`), audience copy, format, count fields, sections / chapters, templates, outcomes, who-for / who-not-for, 90-day roadmap (guides), and a sample prompt / sample chapter for the page-level preview.

**`app/lib/reviews.ts`** holds 1,192 reviews generated by `scripts/generate-reviews.mjs`. Don't edit by hand — re-run the script. Exports:

```ts
REVIEWS: Review[]
getReviewsForProduct(productId)
getReviewStats(productId?): {count, average, distribution: [5★, 4★, 3★, 2★, 1★]}
getAllReviews(), getRecentTopReviews(limit)
TOTAL_REVIEWS
```

Distribution: ~70% 5★, ~20% 4★, ~8% 3★, ~2% 1–2★, per the spec. Counts vary per product (most popular packs get 80–110 reviews, premium guides get 60–85, bundles get 30–50).

## How to add a new product

1. Open `app/lib/catalog.ts`.
2. Add a new entry to `PACKS`, `GUIDES`, or `BUNDLES`. Match the shape; every field is required for the storefront to render.
3. Add the slug to `CROSS_SELL` and add it to the `pairsWith` arrays of any complementary products.
4. Run `node scripts/generate-reviews.mjs` to regenerate reviews and assign some to the new product. (Update the `COUNTS` map in the generator script first to set how many reviews the product should get; you'll also want to add accent phrases to `PACK_ACCENT` or `GUIDE_ACCENT` for the new product so its reviews mention it by name.)
5. The mega-menus, footer, catalog pages, bundles, and cross-sell sections all read from `catalog.ts` — they'll pick up the new product automatically.

## Decisions made autonomously

The spec said "make the call, document in README." Calls worth flagging:

1. **Faceless Content priced at $147, not $97** (v2 decision, still in effect). The v2 spec quoted "Save $679" on the Guides Bundle and "Save $880" on the Mega Bundle as headline marketing numbers. Those numbers require the individual guide-total to be $1,176; the spec's explicit per-guide prices add to only $1,126. Bumping Faceless Content from $97 → $147 made the headline savings numbers true.

2. **Slug change for prompt packs** (v2). Old URLs like `/packs/marketers-pack` are now `/packs/marketer`. The old URLs return 404 rather than redirect.

3. **Packs bundle moved** (v2). From `/packs/complete-bundle` to `/bundles/packs`. All four bundles live under `/bundles/$slug`.

4. **Everything Bundle pricing math** (v3). The spec stated "$1,712 individual → $798 bundle (save $914)". My math: 7 packs ($253) + 8 guides ($1,176) + 3 Authority ($283) = $1,712 individual. With bundle at $798, savings = $914. The "20 products" copy on the page counts 18 unique products (7 packs + 8 guides + 3 Authority) + the 2 sub-bundles a buyer would otherwise stack (Packs Bundle + Authority Bundle), matching the spec's headline number.

5. **Authority product type and routing** (v3). The 3 Authority products span two data shapes — a prompt pack (Content Engine, $39) and two guide-style playbooks (Personal Brand $147, High-Ticket Finder $97). Rather than forcing them into one shape, the `Authority` type carries a `coverStyle: 'pack' | 'guide'` field and `app/routes/authority.$slug.tsx` dispatches to the matching page layout. Existing pack and guide components are reused via casts — no code duplication.

6. **Nav order** (v3). The spec showed "Home | Packs | Authority | Bundles | Guides | Reviews | Method | About" with Authority sitting between Packs and Bundles. That's the order shipped: tiered by price (Packs → Authority → Bundles → Guides reads as ticket-size progression).

7. **Authority reviews are 5-star only** (v3). Per spec: all 215 Authority reviews (60 + 70 + 50 + 35 across the 3 products and the Authority Bundle) carry a 5-star rating. Realistic variation in name, location, role, date, length, and tone is preserved. Implemented in `scripts/generate-reviews.mjs` via `AUTHORITY_PRODUCT_IDS` short-circuit in `ratingFor()`.

8. **Founder name** (v3). All references to "Mira" replaced with "Nathan" per spec — appears in About page signature, FAQ "Who are you?" answer, Contact page, and Founder note. The reviewer name pool also had "Mira" removed so no reviewer shares the founder's old name.

9. **"Works With" marquee** (v3). Homepage marquee now lists LLM names (Claude, ChatGPT, Gemini, Grok, Perplexity, Mistral, Llama, Copilot) under a "Works with" eyebrow — accurate to how the products are actually used.

10. **Helpful-count generation** (v3.1). Each review's `helpfulCount` is generated deterministically in `scripts/generate-reviews.mjs::generateHelpfulCount(rating, date)`. Base bucket is per the spec (60/25/12/3 across 0-15 / 16-50 / 51-150 / 151-350+), then multiplied by an age factor (older → higher) and a rating factor (5★ +20%, 3★ -15%, 1-2★ -30%). A post-pass picks the highest 5-star review per product and boosts it to a "champion" 220-350 range so each product has a clear top review.

11. **Recent-purchase data** (v3.1). `app/lib/recent_purchases.ts` ships ~115 placeholder buyer entries weighted toward the high-volume products (Marketer's Pack, AI Power User Pack, Everything Bundle). The `RecentPurchaseToast` component consumes this array. **Transition plan:** when Shopify is live, replace this static array with a Cloudflare KV-backed feed of the last 200 real `orders/paid` webhook events. Keep the `RecentPurchase` shape stable so the toast component doesn't change. The 70% "Recent" timestamp default keeps copy honest until real timestamps are available.

12. **Em-dash policy** (v3.1). All user-facing em-dashes stripped from the codebase. The 33 remaining em-dashes are all in code comments / JSDoc headers, which users never see. A linter could enforce this if desired: `grep -P "—" app/**/*.tsx | grep -v "^\\s*//"` should return empty.

## Brand tokens

Defined as CSS custom properties in `app/styles/promptos.css` `:root`. Also mirrored as Tailwind `@theme` tokens in `tailwind.css`. Most-used:

| Token | Hex | Use |
|---|---|---|
| `--promptos-purple` | `#6B46C1` | Primary CTA, hover states |
| `--promptos-pink` | `#EC4899` | Accent (cursor, badges, save labels) |
| `--ink` | `#1F2937` | Body text |
| `--ink-deep` | `#0F0A1F` | Dark sections (footer, bundle pushes) |
| `--slate` | `#6B7280` | Subtext |
| `--cream` | `#FAFAFA` | Quiet card surface |
| `--bone` | `#F5F2EC` | Editorial surface |
| `--grad-pp` | `linear-gradient(135deg, #6B46C1 0%, #EC4899 100%)` | Gradient CTAs |

Per-pack and per-guide tones (`--pack-marketers`, `--pack-writers`, etc.) live on the same `:root` block.

## Run locally

**Requirements:** Node `^22 || ^24`.

```bash
npm install
npm run dev
```

Dev server starts on `http://localhost:3000`. Mock.shop is the backend by default, so no Shopify credentials are needed for the first run.

Other scripts:

```bash
npm run build          # production build (includes codegen)
npm run preview        # build + run preview server
npm run typecheck      # react-router typegen + tsc
npm run lint           # eslint
npm run codegen        # regenerate types from Shopify GraphQL schema
node scripts/generate-reviews.mjs  # regenerate reviews.ts
```

## Connect a real Shopify store

1. Create a Hydrogen storefront in the Shopify admin (Hydrogen channel → Create storefront).
2. Run `npx shopify hydrogen link` to pair this project with that storefront. It populates `.env` with the storefront credentials.
3. Create the 17 products in Shopify using the `shopifyHandle` values from `app/lib/catalog.ts`:
   - Packs: `promptos-marketers-pack`, `promptos-writers-pack`, `promptos-developer-pack`, `promptos-solopreneur-pack`, `promptos-content-creator-pack`, `promptos-ai-power-user-pack`, `promptos-productivity-pack`.
   - Guides: `promptos-ai-automation-agency`, `promptos-ai-agent-builder`, `promptos-web-design-agency`, `promptos-digital-products`, `promptos-newsletter-business`, `promptos-faceless-content`, `promptos-saas-side-project`, `promptos-coaching-consulting`.
   - Bundles: `promptos-packs-bundle`, `promptos-guides-bundle`, `promptos-everything`.
4. Once those products exist, every "Add to cart" button on the site (which currently links to `/products/{handle}`) will serve real cart/checkout flows.

## Deploy to Oxygen

[Oxygen](https://shopify.dev/docs/custom-storefronts/oxygen) is Shopify's hosting platform for Hydrogen.

```bash
npx shopify hydrogen link
npx shopify hydrogen deploy
npx shopify hydrogen deploy --environment production
```

Oxygen builds with `npm run build` and runs the resulting worker on Shopify's edge. Environment variables are managed in the Shopify admin under the Hydrogen storefront → **Environments**.

For CI: store a Shopify deployment token in your CI secrets and run `npx shopify hydrogen deploy --token $SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN --environment production`.

## Accessibility

- All interactive elements keyboard-navigable.
- `:focus-visible` rings everywhere (purple, 2px offset).
- Skip-to-content link at the top of the page (visible on focus).
- All icon-only buttons have `aria-label`s.
- Decorative SVGs marked `aria-hidden`.
- `prefers-reduced-motion: reduce` disables all `fade-up`, marquee, drift, gradient-shift, and orb animations — handled in `promptos-v2.css`.

## Responsive

Breakpoints at 1100px (catalog grids → 2 col), 900px (most multi-col → 1 col), 700px (templates / do-dont → 1 col), 600px (guides grid → 1 col).

Mobile-specific:
- Hamburger nav opens a slide-in drawer with accordion sections for Packs / Guides / Bundles.
- Hero typography scales with `clamp()`.
- Sticky purchase bars on pack + guide pages.
- Touch targets minimum 44px.

## Re-extracting the design

If the Claude design hand-off is updated, drop the new file at `~/Downloads/Promptos Storefront.html` and re-run the extractors:

```bash
node scripts/extract-design.mjs    # → .design-extract/{template.html,manifest.json,assets/}
node scripts/extract-css.mjs       # → .design-extract/design.css
cp .design-extract/design.css app/styles/promptos.css
```

Diff `.design-extract/body.html` against the components and update as needed.
