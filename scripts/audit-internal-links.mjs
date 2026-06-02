#!/usr/bin/env node
/**
 * v3.9c-tactical — internal link auditor.
 *
 * Crawls every <Link to="..."> and <a href="..."> in app/components/
 * and app/routes/, normalizes the set of unique internal URLs, then
 * checks each one against the route manifest in app/routes/.
 *
 * Outputs:
 *   - A list of every unique internal URL referenced.
 *   - A list of references that DON'T match any route (probable
 *     broken links).
 *   - Exit code 1 if any broken link is found, 0 otherwise.
 *
 * Usage: `npm run audit-links` or `node scripts/audit-internal-links.mjs`
 */

import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['app/components', 'app/routes'];
const ROUTES_DIR = join(ROOT, 'app/routes');

// --- Step 1: enumerate the routes manifest ---

function listRoutes(dir = ROUTES_DIR, prefix = '') {
  const out = new Set();
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      for (const sub of listRoutes(full, prefix + '/' + entry)) out.add(sub);
      continue;
    }
    if (!/\.(tsx|jsx|ts|js)$/.test(entry)) continue;
    if (entry === '+types' || entry.endsWith('.d.ts')) continue;
    let name = entry.replace(/\.(tsx|jsx|ts|js)$/, '');
    // React Router file conventions (no flat-routes plugin here, but
    // names like `bundles.$slug.tsx` map to /bundles/$slug)
    if (name === '_index') {
      out.add(prefix || '/');
      continue;
    }
    if (name === '$') {
      out.add(`${prefix}/__catchall__`);
      continue;
    }
    // Strip trailing `._index` (folder convention) and `_` prefixes
    name = name.replace(/\._index$/, '');
    // `route.subroute._index` → `route/subroute`
    const segs = name.split('.').map((s) => {
      if (s.startsWith('_')) return ''; // pathless layout — skip
      return s.replace(/\$/, ':');     // $slug → :slug
    }).filter(Boolean);
    out.add('/' + segs.join('/'));
  }
  return out;
}

const allRoutes = listRoutes();

function routeMatches(href) {
  // Strip query + hash
  const clean = href.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  if (allRoutes.has(clean)) return true;
  // Parameterized route match — /packs/marketer matches /packs/:slug
  for (const r of allRoutes) {
    if (!r.includes(':')) continue;
    const re = new RegExp('^' + r.replace(/:[^/]+/g, '[^/]+') + '$');
    if (re.test(clean)) return true;
  }
  // Anchor-only links are intra-page, allowed
  if (href.startsWith('#')) return true;
  return false;
}

// --- Step 2: walk source files for internal links ---

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) files.push(...walk(full));
    else if (/\.(tsx|jsx|ts|js)$/.test(entry)) files.push(full);
  }
  return files;
}

const LINK_RX = /(?:to|href)=(?:"([^"]+)"|{`([^`]+)`}|{'([^']+)'})/g;

const refs = new Map(); // href -> array of file:line
for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const text = readFileSync(file, 'utf8');
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      let m;
      LINK_RX.lastIndex = 0;
      while ((m = LINK_RX.exec(line)) !== null) {
        const href = m[1] ?? m[2] ?? m[3];
        if (!href) continue;
        if (!href.startsWith('/')) continue;        // skip external + relative
        if (href.startsWith('//')) continue;        // protocol-relative external
        // Skip template strings with un-substituted vars (we can't resolve those statically)
        if (href.includes('${')) continue;
        const loc = `${relative(ROOT, file)}:${i + 1}`;
        if (!refs.has(href)) refs.set(href, []);
        refs.get(href).push(loc);
      }
    });
  }
}

// --- Step 3: report ---

const sorted = [...refs.keys()].sort();
const broken = [];

console.log(`\nInternal link audit — ${sorted.length} unique paths found across the codebase\n`);
for (const href of sorted) {
  const ok = routeMatches(href);
  const flag = ok ? '  ' : '✗ ';
  console.log(`${flag}${href}`);
  if (!ok) broken.push({href, refs: refs.get(href)});
}

if (broken.length > 0) {
  console.log(`\n${broken.length} probable broken link(s):\n`);
  for (const b of broken) {
    console.log(`  ${b.href}`);
    for (const r of b.refs) console.log(`    referenced at ${r}`);
  }
  console.log('');
  process.exit(1);
}

console.log(`\nAll ${sorted.length} internal links resolve. ✓\n`);
process.exit(0);
