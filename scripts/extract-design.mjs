// One-shot extractor for the Claude design bundler HTML.
// Reads "Promptos Storefront.html", pulls out the template + manifest,
// writes the raw template HTML to /tmp/promptos-extract/template.html,
// writes the manifest to /tmp/promptos-extract/manifest.json,
// and emits any binary assets (fonts, images) to /tmp/promptos-extract/assets/<uuid>.<ext>.

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const SRC = 'C:/Users/roanp/Downloads/Promptos Storefront.html';
const OUT = 'C:/Users/roanp/Downloads/promptos_storefront/.design-extract';
fs.mkdirSync(path.join(OUT, 'assets'), {recursive: true});

const html = fs.readFileSync(SRC, 'utf8');

function extractScript(type) {
  const re = new RegExp(
    `<script\\s+type="${type}"[^>]*>([\\s\\S]*?)</script>`,
    'i',
  );
  const m = html.match(re);
  if (!m) throw new Error('Missing script of type ' + type);
  return m[1];
}

const templateJson = extractScript('__bundler/template');
const manifestJson = extractScript('__bundler/manifest');
const extResJson = extractScript('__bundler/ext_resources');

// template script holds a JSON-encoded string (the actual HTML body).
const template = JSON.parse(templateJson);
fs.writeFileSync(path.join(OUT, 'template.html'), template, 'utf8');
console.log('template.html bytes:', template.length);

const manifest = JSON.parse(manifestJson);
fs.writeFileSync(
  path.join(OUT, 'manifest.json'),
  JSON.stringify(
    Object.fromEntries(
      Object.entries(manifest).map(([uuid, entry]) => [
        uuid,
        {mime: entry.mime, compressed: !!entry.compressed, size: entry.data?.length ?? 0},
      ]),
    ),
    null,
    2,
  ),
);

const extResources = JSON.parse(extResJson);
fs.writeFileSync(
  path.join(OUT, 'ext_resources.json'),
  JSON.stringify(extResources, null, 2),
);

const extByUuid = new Map();
for (const r of extResources) extByUuid.set(r.uuid, r);

const summary = [];
for (const [uuid, entry] of Object.entries(manifest)) {
  const raw = Buffer.from(entry.data, 'base64');
  const bytes = entry.compressed ? zlib.gunzipSync(raw) : raw;
  const ext = guessExt(entry.mime);
  const idHint = extByUuid.get(uuid)?.id ?? '';
  const safe = idHint ? idHint.replace(/[^a-z0-9._-]+/gi, '_').slice(0, 60) : uuid;
  const outName = `${safe}.${ext}`;
  fs.writeFileSync(path.join(OUT, 'assets', outName), bytes);
  summary.push({uuid, mime: entry.mime, bytes: bytes.length, file: outName, id: idHint});
}
fs.writeFileSync(
  path.join(OUT, 'assets-index.json'),
  JSON.stringify(summary, null, 2),
);
console.log('assets extracted:', summary.length);

function guessExt(mime) {
  if (!mime) return 'bin';
  const map = {
    'font/woff2': 'woff2',
    'font/woff': 'woff',
    'font/ttf': 'ttf',
    'font/otf': 'otf',
    'application/font-woff2': 'woff2',
    'application/font-woff': 'woff',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/gif': 'gif',
    'image/x-icon': 'ico',
    'text/css': 'css',
    'application/javascript': 'js',
    'text/javascript': 'js',
  };
  return map[mime] ?? mime.split('/')[1] ?? 'bin';
}
