# Preservation Process

> Installed in v3.9c-tactical (Phase 6). This is the receipt-keeping
> protocol the codebase uses to make sure nothing is accidentally lost
> when a page gets renovated.

## Why this exists

The Promptos non-negotiables include "nothing is deleted, ever" — every
visual/structural overhaul (v3.9a, v3.9b, v3.9c-tactical) has been
additive or in-place upgrade only. As the codebase grows, that promise
gets harder to verify by eye. A future agent doing a renovation might
*intend* to keep a section but accidentally lose it during a refactor.

This process turns that promise into something a script can check.

## The protocol

Before renovating any page:

1. **Run the snapshot.** Capture the current state of the route as a
   markdown manifest under `docs/page-snapshots/`:

   ```bash
   npm run snapshot-page /packs/marketer
   npm run snapshot-page /                        # homepage
   npm run snapshot-page /guides/saas-side-project /authority/personal-brand
   ```

   By default this fetches from `https://promptos.store`. For local
   verification before a deploy, pass `--local`:

   ```bash
   npm run snapshot-page /packs/marketer -- --local
   ```

   The output file lives at `docs/page-snapshots/<safe-route>.md` and
   contains every H1/H2/H3, eyebrow, CTA text, button text, FAQ
   question, review title, internal link, and OG image reference the
   live page exposes.

2. **Make your renovation.**
   Do the work — refactor components, swap copy, restructure
   sections. The non-negotiables still apply: nothing deleted, additive
   or in-place upgrade only.

3. **Verify against the snapshot.**

   ```bash
   npm run verify-page /packs/marketer            # after deploy
   npm run verify-page /packs/marketer -- --local # before deploy
   ```

   The verifier re-extracts the same structured list from the new
   render and diffs it against the snapshot. It exits non-zero if any
   snapshotted item is missing. Output is human-readable:

   ```
   ✗ /packs/marketer — 2 item(s) missing:
       H2: "What you actually get"
       FAQ questions: "Can I use these for client work?"
   ```

   That tells you exactly which preserved content disappeared.

## When to update the snapshot

You only re-run `snapshot-page` to lock in a new baseline when the
intentional set of items on that route changed — e.g. you deliberately
removed an obsolete section (with the user's blessing) or added new
ones that should be preserved going forward.

For incremental tweaks (typo fixes, atmosphere additions, layout
shifts), don't re-snapshot until the renovation is complete and
approved. That way the diff stays meaningful.

## What the snapshot covers (and what it doesn't)

The snapshot captures **structural identity**, not pixel-perfect
visual state. Specifically, it records:

- Every H1, H2, H3 text on the page
- Every section eyebrow (the small label above each section heading)
- Every CTA text (text inside `<a class="btn">` and `<a class="cta">`)
- Every `<button>` text
- Every `<summary>` (FAQ questions)
- Every review title surfaced
- Every internal link href on the page
- The OG image URL
- JSON-LD block count

It does NOT capture:

- Body paragraph content (too noisy; would fail on every typo fix)
- Image URLs other than OG (covers have hashed CDN names that change)
- Styling, animation, layout
- Review body text (we'd snapshot rapidly-rotating UGC otherwise)

If you want fine-grained content lock-in (e.g. "this exact paragraph
must not change"), open the snapshot file and add a manual section
documenting that — the file is plain markdown.

## Files installed by this process

- `scripts/snapshot-page.mjs` — the snapshot generator
- `scripts/verify-page.mjs` — the verifier
- `docs/page-snapshots/*.md` — one snapshot per route
- `docs/PRESERVATION_PROCESS.md` — this file
- `package.json` entries: `npm run snapshot-page`, `npm run verify-page`

## Baseline (v3.9c-tactical merge)

Snapshots for every current route were captured immediately after
the v3.9c-tactical merge. See the `docs/page-snapshots/` directory.
That's the lock-in point for what "no deletions" means going forward.
