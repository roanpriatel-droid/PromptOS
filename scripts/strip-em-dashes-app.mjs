// Strip em-dashes from user-facing copy across the app.
// Code comments (//, *, /*) are skipped. CSS files are skipped.
// Inside source files, every line that isn't a comment has its em-dashes
// replaced with proper punctuation.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/roanp/Downloads/promptos_storefront/app';
const EXTS = new Set(['.ts', '.tsx']);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (EXTS.has(path.extname(entry.name))) out.push(p);
  }
  return out;
}

function isCommentLine(line) {
  const t = line.trimStart();
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*');
}

function replaceLine(line) {
  // Replace ` — ` with `, ` (most natural in body copy).
  let next = line.replace(/ — /g, ', ');
  // Remaining lone em-dashes inside string literals (no spaces) — convert to a
  // hyphen-minus inside compounds, comma otherwise.
  next = next.replace(/—/g, ',');
  return next;
}

let totalChanges = 0;
const files = walk(ROOT);
for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  const lines = src.split(/\r?\n/);
  let dirty = false;
  for (let i = 0; i < lines.length; i++) {
    if (isCommentLine(lines[i])) continue;
    if (!lines[i].includes('—')) continue;
    const rep = replaceLine(lines[i]);
    if (rep !== lines[i]) {
      lines[i] = rep;
      dirty = true;
      totalChanges++;
    }
  }
  if (dirty) fs.writeFileSync(file, lines.join('\n'), 'utf8');
}
console.log(`em-dash lines replaced: ${totalChanges} across ${files.length} files`);
