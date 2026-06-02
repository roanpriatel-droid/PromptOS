#!/usr/bin/env node
/**
 * v3.9c-tactical P4 — per-product OG image generator.
 *
 * For each of the 22 products (7 packs + 8 playbooks + 3 Authority +
 * 4 bundles), emits a 1200×630 PNG OG image at app/assets/og/<slug>.png.
 *
 * The template per image:
 *   - Brand atmospheric gradient background (purple → pink → dark)
 *   - Promptos wordmark top-left
 *   - The product's v3.9 cover at center (read from app/assets/covers)
 *   - Product name (Fraunces/Instrument Serif) + price + eyebrow + rating
 *     to the right of the cover
 *   - Noise overlay (subtle, ~2%)
 *
 * Numbers (review count, rating) are read from real catalog + reviews
 * data — never fabricated.
 *
 * Run: `npm run generate-og`
 * Output: app/assets/og/<slug>.png (committed to the repo; Vite hashes
 * the URL at build time).
 */

import {Resvg} from '@resvg/resvg-js';
import {readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const COVERS_DIR = join(ROOT, 'app/assets/covers');
const OUT_DIR = join(ROOT, 'app/assets/og');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, {recursive: true});

// ----- Read catalog + reviews directly (no TypeScript transpile needed) -----
// catalog.ts is too large + has TS-specific syntax; we scrape the metadata we
// need from the source file with regex. Each product has a `slug:` plus
// supporting fields nearby. This works because the format is uniform.
const catalogSrc = readFileSync(join(ROOT, 'app/lib/catalog.ts'), 'utf8');

function extractProducts() {
  // Pull packs (type: 'pack') with slug + name + number + priceUSD
  const products = [];
  const blockRx = /\{\s*id:\s*'([^']+)',\s*type:\s*'(pack|guide|authority|bundle)'[\s\S]*?\}/g;
  let m;
  while ((m = blockRx.exec(catalogSrc)) !== null) {
    const block = m[0];
    const id = m[1];
    const type = m[2];
    const slugMatch = /slug:\s*'([^']+)'/.exec(block);
    const nameMatch = /name:\s*"([^"]+)"|name:\s*'([^']+)'/.exec(block);
    const priceMatch = /priceUSD:\s*(\d+)/.exec(block);
    const numberMatch = /number:\s*'([^']+)'/.exec(block);
    const promptMatch = /promptCount:\s*(\d+)/.exec(block);
    const pageMatch = /pageCount:\s*(\d+)/.exec(block);
    if (!slugMatch || !nameMatch) continue;
    products.push({
      id,
      type,
      slug: slugMatch[1],
      name: nameMatch[1] || nameMatch[2],
      priceUSD: priceMatch ? Number(priceMatch[1]) : 0,
      number: numberMatch ? numberMatch[1] : '',
      promptCount: promptMatch ? Number(promptMatch[1]) : 0,
      pageCount: pageMatch ? Number(pageMatch[1]) : 0,
    });
  }
  return products;
}

// Review stats — count reviews per productId by regex over reviews.ts.
function loadReviewStats() {
  const src = readFileSync(join(ROOT, 'app/lib/reviews.ts'), 'utf8');
  const counts = new Map();
  const ratings = new Map();
  const rx = /"productId":\s*"([^"]+)"[\s\S]*?"rating":\s*(\d)/g;
  let m;
  while ((m = rx.exec(src)) !== null) {
    const pid = m[1];
    const r = Number(m[2]);
    counts.set(pid, (counts.get(pid) ?? 0) + 1);
    ratings.set(pid, (ratings.get(pid) ?? 0) + r);
  }
  const stats = new Map();
  for (const [pid, count] of counts) {
    const sum = ratings.get(pid) ?? 0;
    stats.set(pid, {count, avg: count > 0 ? sum / count : 0});
  }
  return stats;
}

const PRODUCTS = extractProducts();
const REVIEW_STATS = loadReviewStats();

console.log(`Found ${PRODUCTS.length} products in catalog.`);
console.log(`Found review stats for ${REVIEW_STATS.size} products.`);

// ----- Build an OG SVG for a given product -----

function eyebrowFor(p) {
  if (p.type === 'pack') return p.number ? `PACK Nº ${p.number}` : 'PROMPT PACK';
  if (p.type === 'guide') return p.number ? `PLAYBOOK · G${p.number}` : 'PLAYBOOK';
  if (p.type === 'authority') {
    const map = {'personal-brand': 'A1', 'content-engine': 'A2', 'high-ticket-finder': 'A3'};
    return map[p.slug] ? `AUTHORITY · ${map[p.slug]}` : 'AUTHORITY';
  }
  return 'BUNDLE';
}

function metaLineFor(p) {
  if (p.type === 'pack') return `${p.promptCount} prompts · .docx + PDF`;
  if (p.type === 'guide') return `${p.pageCount} pages · operator frameworks`;
  if (p.type === 'authority') {
    if (p.promptCount > 0 && p.pageCount > 0) return `${p.pageCount} pages + ${p.promptCount} prompts`;
    if (p.promptCount > 0) return `${p.promptCount} prompts`;
    if (p.pageCount > 0) return `${p.pageCount} pages`;
    return 'Authority product';
  }
  return 'Bundle';
}

// Embed the product's v3.9 cover as a data URL so resvg can render it
// alongside the OG layout in a single composition.
function coverDataUrlFor(slug) {
  const path = join(COVERS_DIR, `${slug}.svg`);
  if (!existsSync(path)) return null;
  const buf = readFileSync(path);
  const b64 = buf.toString('base64');
  return `data:image/svg+xml;base64,${b64}`;
}

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function buildSvg(p) {
  const W = 1200;
  const H = 630;
  const stats = REVIEW_STATS.get(p.id) ?? {count: 0, avg: 0};
  const coverData = coverDataUrlFor(p.slug);
  const eyebrow = eyebrowFor(p);
  const meta = metaLineFor(p);
  const name = p.name;
  const priceUSD = p.priceUSD;

  // Resvg renders without web fonts, so we use generic family names with
  // serif/sans-serif/monospace fallbacks. The rendered text will use the
  // system fonts resvg has access to (DejaVu / Liberation / Noto on the
  // generator's machine). That's fine for OG since the layout, color, and
  // composition do the heavy lifting; text legibility is preserved.
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="30%" cy="25%" r="100%">
      <stop offset="0%" stop-color="#2E1660"/>
      <stop offset="55%" stop-color="#150726"/>
      <stop offset="100%" stop-color="#05010F"/>
    </radialGradient>
    <radialGradient id="glow-purple" cx="22%" cy="22%" r="50%">
      <stop offset="0%" stop-color="#9264E5" stop-opacity="0.35"/>
      <stop offset="70%" stop-color="#9264E5" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-pink" cx="78%" cy="78%" r="55%">
      <stop offset="0%" stop-color="#EC4899" stop-opacity="0.32"/>
      <stop offset="70%" stop-color="#EC4899" stop-opacity="0"/>
    </radialGradient>
    <filter id="cover-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#04020E" flood-opacity="0.65"/>
    </filter>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.04 0"/>
    </filter>
  </defs>

  <!-- base + atmospheric glows -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow-purple)"/>
  <rect width="${W}" height="${H}" fill="url(#glow-pink)"/>

  <!-- top-left wordmark -->
  <g transform="translate(56, 60)">
    <path d="M0 8 L18 22 L0 36" fill="none" stroke="#EC4899" stroke-width="4" stroke-linecap="square"/>
    <rect x="24" y="6" width="4" height="32" fill="#FAF8F5"/>
    <text x="42" y="32" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="600" letter-spacing="-0.3" fill="#FAF8F5">promptos</text>
  </g>

  <!-- top-right eyebrow + price pill -->
  <g transform="translate(${W - 56}, 60)" text-anchor="end">
    <text font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="rgba(250,248,245,0.65)" y="22">${escapeXml(eyebrow)}</text>
    ${priceUSD > 0 ? `
    <g transform="translate(0, 36)">
      <rect x="-150" y="0" width="150" height="38" rx="19" fill="#EC4899"/>
      <text x="-75" y="25" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="700" fill="#FAF8F5">$${priceUSD} USD</text>
    </g>` : ''}
  </g>

  <!-- center cover (left half) -->
  ${coverData ? `
  <g filter="url(#cover-shadow)">
    <rect x="80" y="115" width="400" height="400" rx="20" fill="#0B0518"/>
    <image x="80" y="115" width="400" height="400" preserveAspectRatio="xMidYMid slice" href="${coverData}"/>
    <rect x="80" y="115" width="400" height="400" rx="20" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.5"/>
  </g>` : `
  <g filter="url(#cover-shadow)">
    <rect x="80" y="115" width="400" height="400" rx="20" fill="#3B1F6B"/>
    <text x="280" y="335" text-anchor="middle" font-family="Georgia, serif" font-size="60" font-style="italic" fill="#FAF8F5">${escapeXml(p.name.split(' ').pop())}</text>
  </g>`}

  <!-- right column: name + meta + rating -->
  <g transform="translate(540, 220)">
    <!-- product name (serif) — break across 2 lines if long -->
    <text font-family="Georgia, 'Times New Roman', serif" font-size="56" font-weight="500" font-style="italic" fill="#FAF8F5" letter-spacing="-1.2">
      ${(() => {
        // Greedy wrap into up to 3 lines, ~22 chars per line.
        const words = name.split(/\s+/);
        const lines = [];
        let cur = '';
        for (const w of words) {
          const next = cur ? cur + ' ' + w : w;
          if (next.length > 22 && cur) { lines.push(cur); cur = w; } else { cur = next; }
          if (lines.length >= 2) break;
        }
        if (cur) lines.push(cur);
        return lines.slice(0, 3).map((l, i) => `<tspan x="0" dy="${i === 0 ? 0 : 64}">${escapeXml(l)}</tspan>`).join('');
      })()}
    </text>
    <!-- meta line -->
    <text x="0" y="${name.length > 22 ? 200 : 150}" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="600" letter-spacing="0.6" fill="rgba(250,248,245,0.75)">${escapeXml(meta)}</text>
  </g>

  <!-- bottom-right rating + count, only when there are real reviews -->
  ${stats.count > 0 ? `
  <g transform="translate(${W - 56}, ${H - 56})" text-anchor="end">
    <text font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="2.4" fill="rgba(250,248,245,0.55)">
      ★ ${stats.avg.toFixed(1)} · ${stats.count.toLocaleString()} reviews
    </text>
  </g>` : ''}

  <!-- bottom-left URL stamp -->
  <text x="56" y="${H - 56}" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" letter-spacing="2" fill="rgba(250,248,245,0.55)">promptos.store</text>

  <!-- subtle noise -->
  <rect width="${W}" height="${H}" filter="url(#noise)" opacity="0.5"/>
</svg>`;
}

// ----- Render each product to PNG -----

let ok = 0;
let fail = 0;
for (const p of PRODUCTS) {
  try {
    const svg = buildSvg(p);
    const resvg = new Resvg(svg, {
      background: 'rgba(15, 10, 31, 1)',
      fitTo: {mode: 'width', value: 1200},
      font: {loadSystemFonts: true},
    });
    const png = resvg.render().asPng();
    const outPath = join(OUT_DIR, `${p.slug}.png`);
    writeFileSync(outPath, png);
    console.log(`✓ ${p.slug.padEnd(28)} ${(png.length / 1024).toFixed(0)} KB`);
    ok += 1;
  } catch (err) {
    console.error(`✗ ${p.slug} — ${err.message}`);
    fail += 1;
  }
}

console.log(`\nDone. ${ok} OG images written, ${fail} failed.`);
if (fail > 0) process.exit(1);
