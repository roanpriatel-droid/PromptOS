#!/usr/bin/env node
/**
 * v3.9c-tactical P6 — Page verification tool.
 *
 * Companion to snapshot-page.mjs. Fetches the current render of a
 * route, extracts the same structured list (H1/H2/H3, eyebrows,
 * CTAs, FAQ questions, internal links), and diffs against the saved
 * snapshot at docs/page-snapshots/<route>.md.
 *
 * Exit codes:
 *   0 — every snapshotted item still appears in the current render
 *   1 — at least one item is missing (likely an accidental deletion)
 *   2 — usage / fetch / snapshot-not-found errors
 *
 * Usage:
 *   node scripts/verify-page.mjs <route> [<route> ...] [--local]
 *
 * Used as a "preservation receipt" before merging any page-level
 * renovation. See docs/PRESERVATION_PROCESS.md.
 */

import {readFileSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SNAPSHOTS_DIR = join(ROOT, 'docs/page-snapshots');

const args = process.argv.slice(2);
const local = args.includes('--local');
const routes = args.filter((a) => !a.startsWith('--'));

if (routes.length === 0) {
  console.error('Usage: verify-page.mjs <route> [<route> ...] [--local]');
  process.exit(2);
}

const BASE = local ? 'http://localhost:3000' : 'https://promptos.store';

function strip(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&middot;/g, '·')
    .replace(/&[a-z]+;/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
function extractAll(html, openRx, closeRx) {
  const items = [];
  const re = new RegExp(`<${openRx}\\b[^>]*>([\\s\\S]*?)</${closeRx}>`, 'gi');
  let m;
  while ((m = re.exec(html)) !== null) {
    const t = strip(m[1]);
    if (t) items.push(t);
  }
  return items;
}
function unique(a) { return [...new Set(a)]; }

async function fetchSnapshot(route) {
  const url = BASE + route;
  const res = await fetch(url, {redirect: 'follow'});
  if (!res.ok) throw new Error(`fetch ${url} returned ${res.status}`);
  const html = await res.text();
  return {
    H1: unique(extractAll(html, 'h1', 'h1')),
    H2: unique(extractAll(html, 'h2', 'h2')),
    H3: unique(extractAll(html, 'h3', 'h3')),
    Eyebrows: unique(extractAll(html, '(?:span|div)[^>]*class="[^"]*section-eyebrow[^"]*"', '(?:span|div)')),
    'CTA text': unique([
      ...extractAll(html, 'a[^>]*class="[^"]*btn[^"]*"', 'a'),
      ...extractAll(html, 'a[^>]*class="[^"]*cta[^"]*"', 'a'),
    ]),
    Buttons: unique(extractAll(html, 'button', 'button')),
    'FAQ questions': unique(extractAll(html, 'summary', 'summary')),
  };
}

function parseSnapshot(path) {
  const text = readFileSync(path, 'utf8');
  // Sections are "## <Title> (N)" followed by bullet "- item" lines
  const out = {};
  const sections = text.split(/^## /m).slice(1);
  for (const sec of sections) {
    const lines = sec.split(/\r?\n/);
    const title = lines[0].replace(/\s*\(\d+\)\s*$/, '').trim();
    const items = lines.filter((l) => l.startsWith('- ')).map((l) => l.slice(2).trim());
    out[title] = items;
  }
  return out;
}

let totalMissing = 0;
let totalChecked = 0;
const failures = [];

for (const route of routes) {
  const safe = route === '/' ? '-home' : route.replace(/[\\/:?#&]+/g, '-').replace(/^-+|-+$/g, '');
  const snapPath = join(SNAPSHOTS_DIR, `${safe}.md`);
  if (!existsSync(snapPath)) {
    console.error(`✗ ${route}: no snapshot at ${snapPath}. Run \`npm run snapshot-page ${route}\` to create one.`);
    process.exit(2);
  }
  const expected = parseSnapshot(snapPath);
  let actual;
  try {
    actual = await fetchSnapshot(route);
  } catch (err) {
    console.error(`✗ ${route}: ${err.message}`);
    failures.push({route, missing: ['(fetch failed)']});
    continue;
  }

  const missingForRoute = [];
  // Only verify the structured sections we know how to re-extract.
  const verifyKeys = ['H1', 'H2', 'H3', 'Eyebrows', 'CTA text', 'Buttons', 'FAQ questions'];
  for (const key of verifyKeys) {
    const want = expected[key] ?? [];
    const have = new Set(actual[key] ?? []);
    for (const item of want) {
      totalChecked += 1;
      if (!have.has(item)) {
        missingForRoute.push(`${key}: "${item}"`);
        totalMissing += 1;
      }
    }
  }

  if (missingForRoute.length === 0) {
    console.log(`✓ ${route} (${verifyKeys.length} sections OK)`);
  } else {
    console.log(`✗ ${route} — ${missingForRoute.length} item(s) missing:`);
    for (const m of missingForRoute) console.log(`    ${m}`);
    failures.push({route, missing: missingForRoute});
  }
}

console.log(`\n${totalChecked - totalMissing}/${totalChecked} snapshotted items verified.`);
if (failures.length > 0) {
  console.error(`${failures.length} route(s) failed preservation check.`);
  process.exit(1);
}
process.exit(0);
