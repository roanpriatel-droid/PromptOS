#!/usr/bin/env node
/**
 * v3.9c-tactical P6 — Page snapshot tool (preservation receipt).
 *
 * Usage:
 *   node scripts/snapshot-page.mjs <route>          (fetches from prod)
 *   node scripts/snapshot-page.mjs <route> --local  (fetches from localhost:3000)
 *
 * Reads the rendered HTML for a route, extracts a structured list of
 * sections / headings / CTAs / review bodies / FAQ questions, and writes
 * a markdown snapshot to docs/page-snapshots/<route>.md.
 *
 * Before any future renovation of a page, run this once to lock in
 * the current state. After the renovation, run `verify-page.mjs <route>`
 * to confirm nothing was accidentally lost — the diff fails if any
 * snapshotted item is missing from the new render.
 *
 * NOTE: this is HTML-level structural snapshotting, intentionally
 * lightweight. We don't run a headless browser — we fetch + parse with
 * a tiny regex pipeline. That gives us 90% of the value for a single
 * binary dep.
 */

import {writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SNAPSHOTS_DIR = join(ROOT, 'docs/page-snapshots');

const args = process.argv.slice(2);
const local = args.includes('--local');
const routes = args.filter((a) => !a.startsWith('--'));

if (routes.length === 0) {
  console.error('Usage: snapshot-page.mjs <route> [<route> ...] [--local]');
  process.exit(2);
}

const BASE = local ? 'http://localhost:3000' : 'https://promptos.store';

if (!existsSync(SNAPSHOTS_DIR)) mkdirSync(SNAPSHOTS_DIR, {recursive: true});

// ------- HTML extraction helpers (lightweight, no JSDOM) -------

function strip(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&middot;/g, '·')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractAll(html, openRx, closeRx) {
  const items = [];
  const re = new RegExp(`<${openRx}\\b[^>]*>([\\s\\S]*?)</${closeRx}>`, 'gi');
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = strip(m[1]);
    if (text) items.push(text);
  }
  return items;
}

function extractAttr(html, tag, attr) {
  const items = [];
  const re = new RegExp(`<${tag}\\b[^>]*\\b${attr}=["']([^"']+)["'][^>]*>`, 'gi');
  let m;
  while ((m = re.exec(html)) !== null) items.push(m[1]);
  return items;
}

function unique(arr) {
  return [...new Set(arr)];
}

// ------- Snapshot one route -------

async function snapshotRoute(route) {
  const url = BASE + route;
  console.log(`Snapshotting ${url}`);
  const res = await fetch(url, {redirect: 'follow'});
  if (!res.ok) {
    console.error(`  ✗ ${res.status} ${res.statusText}`);
    return null;
  }
  const html = await res.text();

  // Headings
  const h1 = extractAll(html, 'h1', 'h1');
  const h2 = extractAll(html, 'h2', 'h2');
  const h3 = extractAll(html, 'h3', 'h3');

  // CTAs: any <a> or <button> with brand "btn" / "cta" class, plus
  // text content of <a> elements that link to /packs|/guides|/authority|/bundles.
  const buttonTexts = unique(extractAll(html, 'button', 'button'));
  const ctaLinks = unique([
    ...extractAll(html, 'a[^>]*class="[^"]*btn[^"]*"', 'a'),
    ...extractAll(html, 'a[^>]*class="[^"]*cta[^"]*"', 'a'),
  ]);

  // Section eyebrows (common pattern on this site)
  const eyebrows = unique(
    extractAll(html, '(?:span|div)[^>]*class="[^"]*section-eyebrow[^"]*"', '(?:span|div)'),
  );

  // FAQ questions
  const faqQuestions = unique(extractAll(html, 'summary', 'summary'));

  // Review titles (heuristic: review-card or h4 inside review block)
  const reviewTitles = unique(extractAll(html, 'h4[^>]*class="[^"]*review[^"]*"', 'h4'));

  // Internal links (canonical paths only, for cross-page coverage)
  const internalLinks = unique(
    extractAttr(html, 'a', 'href').filter((h) => h.startsWith('/') && !h.startsWith('//')),
  ).sort();

  // JSON-LD blocks (just count them — verification re-checks types)
  const ldBlocks = extractAll(html, 'script[^>]*type="application/ld\\+json"', 'script');

  // Meta image (og)
  const ogImage = (extractAttr(html, 'meta', 'content').find((c) => /og\/[^/]+\.(png|jpg)/.test(c)) || '').trim();

  return {
    route,
    url,
    fetchedAt: new Date().toISOString(),
    h1,
    h2,
    h3,
    eyebrows,
    buttonTexts,
    ctaLinks,
    faqQuestions,
    reviewTitles,
    internalLinks,
    ldBlocksCount: ldBlocks.length,
    ogImage,
    htmlBytes: html.length,
  };
}

function toMarkdown(snap) {
  const lines = [];
  const safeRoute = snap.route.replace(/[\\/]/g, '-') || '-home';
  lines.push(`# Page snapshot — ${snap.route}\n`);
  lines.push(`> Captured ${snap.fetchedAt} from ${snap.url}.`);
  lines.push(`> HTML size: ${snap.htmlBytes.toLocaleString()} bytes · JSON-LD blocks: ${snap.ldBlocksCount}\n`);
  if (snap.ogImage) lines.push(`**OG image**: \`${snap.ogImage}\`\n`);

  function bulleted(title, arr) {
    if (!arr || arr.length === 0) return;
    lines.push(`## ${title} (${arr.length})\n`);
    for (const it of arr) lines.push(`- ${it.replace(/\|/g, '\\|')}`);
    lines.push('');
  }

  bulleted('H1', snap.h1);
  bulleted('H2', snap.h2);
  bulleted('H3', snap.h3);
  bulleted('Eyebrows', snap.eyebrows);
  bulleted('CTA text', snap.ctaLinks);
  bulleted('Buttons', snap.buttonTexts);
  bulleted('FAQ questions', snap.faqQuestions);
  bulleted('Review titles surfaced', snap.reviewTitles);
  bulleted('Internal links referenced', snap.internalLinks);
  return lines.join('\n');
}

let okCount = 0;
let failCount = 0;
for (const route of routes) {
  const snap = await snapshotRoute(route);
  if (!snap) { failCount += 1; continue; }
  const safe = route === '/' ? '-home' : route.replace(/[\\/:?#&]+/g, '-').replace(/^-+|-+$/g, '');
  const outPath = join(SNAPSHOTS_DIR, `${safe}.md`);
  writeFileSync(outPath, toMarkdown(snap), 'utf8');
  console.log(`  ✓ wrote ${outPath.replace(ROOT + '\\', '').replace(ROOT + '/', '')}`);
  okCount += 1;
}

console.log(`\n${okCount} snapshot(s) written. ${failCount} failed.`);
process.exit(failCount > 0 ? 1 : 0);
