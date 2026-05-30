/**
 * v3.8a Phase 4B — add a `headline` field next to each product's
 * `name` in app/lib/catalog.ts and populate with the new conversion
 * headlines from the spec table. Hero components later read
 * `product.headline ?? product.name`.
 */
import {readFileSync, writeFileSync} from 'node:fs';

const FILE = 'app/lib/catalog.ts';

// Map slug -> new headline string per the spec.
const HEADLINES = {
  // Packs
  'marketer': "65 prompts that replace the $300/hr agency you can't afford.",
  'writer': "65 prompts for fiction, non-fiction, and copy that doesn't read like AI.",
  'developer': "55 prompts for code review, debugging, and architecture. Built by an engineer.",
  'solopreneur': "65 prompts for the seven hats. Especially the 11pm investor-update one.",
  'content-creator': "65 prompts for YouTube, newsletters, and short-form. Three channels, one Saturday back.",
  'ai-power-user': "60 meta-prompts for power users. Including the ones we use internally.",
  'productivity': "55 prompts for knowledge work that doesn't bury you in process.",

  // Playbooks
  'ai-automation-agency': "First $5k retainer in 90 days. 180 pages. 14 templates.",
  'ai-agent-builder': "Production agents that don't break. Eval-first. 180 pages.",
  'web-design-agency': "$10k months by week 13. Productized. 140 pages.",
  'digital-products': "Ship a $97-$297 digital product in 90 days. Without quitting your job.",
  'newsletter-business': "First 100 subscribers to first $1,000/month. 90 pages, 12 chapters.",
  'faceless-content': "10k subs and $1k/mo on 4 videos a week. Faceless. 130 pages.",
  'saas-side-project': "$1,000 MRR in 90 days. Without quitting your job. 140 pages.",
  'coaching-consulting': "$200/hr (or $5k packages) for the work you already do. 130 pages.",

  // Authority
  'personal-brand': "Build distribution you own. Without daily posting.",
  'content-engine': "75 prompts for daily content that compounds.",
  'high-ticket-finder': "Find the $4k offer hidden in what you already know.",

  // Bundles
  'packs': "All 7 packs. 430 prompts. Save $154.",
  'authority': "Build the audience. Productize it. Save $34.",
  'guides': "Every playbook. 1,220+ pages. Save $679.",
  'everything': "Every product. One investment. Save $914.",
};

let src = readFileSync(FILE, 'utf8');
const original = src;
let inserted = 0;

// Walk through each product block (object literal with slug + name).
// For each slug we recognize, insert `headline: "..."` immediately after
// the `name: "..."` line. Skips slugs already containing a `headline:`
// field (idempotent).
for (const [slug, headline] of Object.entries(HEADLINES)) {
  // Find the product's block: a "slug: '<slug>'," line followed within
  // ~30 lines by a `name: "..."` line.
  const slugIdx = src.indexOf(`slug: '${slug}',`);
  if (slugIdx === -1) {
    console.error(`MISS: slug '${slug}' not found in catalog.ts`);
    continue;
  }
  // From slugIdx forward, find the next `name:` line.
  const after = src.slice(slugIdx, slugIdx + 4000);
  const nameMatch = after.match(/(\n(\s+)name:\s*[^\n]+\n)/);
  if (!nameMatch) {
    console.error(`MISS: name field for '${slug}' not found`);
    continue;
  }
  const nameLine = nameMatch[1];
  const indent = nameMatch[2];
  // Skip if headline already present in the next ~10 lines
  const block = src.slice(slugIdx, slugIdx + 600);
  if (/\bheadline:\s*['"]/.test(block)) {
    console.log(`SKIP: '${slug}' already has a headline`);
    continue;
  }
  // Compose the new headline line — single-quoted, escape single quotes inside
  const escaped = headline.replace(/'/g, "\\'");
  const newLine = `${nameLine}${indent}headline: '${escaped}',\n`;
  const insertAt = slugIdx + nameMatch.index + nameLine.length;
  src = src.slice(0, insertAt) + `${indent}headline: '${escaped}',\n` + src.slice(insertAt);
  inserted++;
  console.log(`OK: ${slug}`);
}

writeFileSync(FILE, src);
console.log(`\nInserted ${inserted} of ${Object.keys(HEADLINES).length} headlines.`);
console.log(`Size: ${original.length} -> ${src.length}`);
