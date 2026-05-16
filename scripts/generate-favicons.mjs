/**
 * Programmatic favicon + OG image generator.
 *
 * Run from the project root:
 *   node scripts/generate-favicons.mjs
 *
 * Outputs into /public/. Uses sharp for raster + png-to-ico for the
 * multi-resolution ICO. Brand source: the `>|` wordmark mark in
 * purple #6B46C1 / pink #EC4899 on a dark #0F0A1F base. For very
 * small sizes we degrade to a bold "P" so it stays legible at 16px.
 */
import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '..', 'public');

const PURPLE = '#6B46C1';
const PINK = '#EC4899';
const DARK = '#0F0A1F';
const CREAM = '#FAFAFA';

/** The brand-mark favicon (used at 32+). Square viewBox. */
function brandMarkSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${DARK}"/>
  <path d="M16 18 L30 32 L16 46" fill="none" stroke="${PINK}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="36" y="18" width="6" height="28" rx="2" fill="${PURPLE}"/>
</svg>`;
}

/** The simplified mark for very small sizes — bold "P" stays legible at 16px. */
function smallMarkSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${PURPLE}"/>
  <text x="32" y="46" text-anchor="middle" font-family="Georgia, serif" font-size="46" font-weight="700" fill="${CREAM}">P</text>
</svg>`;
}

/** Open Graph default image (1200x630). */
function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${DARK}"/>
      <stop offset="100%" stop-color="#1A0B3A"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0%" stop-color="${PINK}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${PINK}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.15" cy="0.85" r="0.6">
      <stop offset="0%" stop-color="${PURPLE}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${PURPLE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <g transform="translate(96, 96)">
    <path d="M0 14 L24 30 L0 46" fill="none" stroke="${PINK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="32" y="14" width="7" height="32" rx="2" fill="${PURPLE}"/>
    <text x="56" y="44" font-family="Georgia, serif" font-size="30" font-weight="600" fill="${CREAM}">promptos</text>
  </g>
  <g transform="translate(96, 240)">
    <text font-family="Georgia, serif" font-size="78" font-weight="500" fill="${CREAM}" letter-spacing="-2">
      <tspan x="0" dy="0">Premium AI prompts and</tspan>
      <tspan x="0" dy="92">business playbooks.</tspan>
    </text>
  </g>
  <g transform="translate(96, 504)">
    <text font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="500" fill="rgba(250,250,250,0.72)" letter-spacing="-0.3">
      20 products . 535 prompts . 1,080+ pages . one-time payment
    </text>
  </g>
  <g transform="translate(96, 556)">
    <text font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="rgba(250,250,250,0.5)" letter-spacing="3">
      PROMPTOS.STORE
    </text>
  </g>
</svg>`;
}

async function writePng(svgString, outFile, size) {
  const buf = await sharp(Buffer.from(svgString))
    .resize(size, size, {fit: 'contain'})
    .png({compressionLevel: 9})
    .toBuffer();
  await fs.writeFile(outFile, buf);
  console.log(`  wrote ${path.basename(outFile)} (${size}x${size}, ${buf.length} bytes)`);
}

async function main() {
  await fs.mkdir(PUBLIC, {recursive: true});
  console.log('Writing to', PUBLIC);

  // PNG variants
  await writePng(smallMarkSvg(16), path.join(PUBLIC, 'favicon-16x16.png'), 16);
  await writePng(smallMarkSvg(32), path.join(PUBLIC, 'favicon-32x32.png'), 32);
  await writePng(brandMarkSvg(180), path.join(PUBLIC, 'apple-touch-icon.png'), 180);
  await writePng(brandMarkSvg(192), path.join(PUBLIC, 'android-chrome-192x192.png'), 192);
  await writePng(brandMarkSvg(512), path.join(PUBLIC, 'android-chrome-512x512.png'), 512);

  // OG default — 1200x630 with text overlay
  const ogBuf = await sharp(Buffer.from(ogSvg()))
    .resize(1200, 630)
    .png({compressionLevel: 9})
    .toBuffer();
  await fs.writeFile(path.join(PUBLIC, 'og-default.png'), ogBuf);
  console.log(`  wrote og-default.png (1200x630, ${ogBuf.length} bytes)`);

  // Multi-resolution ICO — feed in PNG buffers at 16/32/48
  const icoSources = await Promise.all(
    [16, 32, 48].map((size) =>
      sharp(Buffer.from(size <= 32 ? smallMarkSvg(size) : brandMarkSvg(size)))
        .resize(size, size, {fit: 'contain'})
        .png()
        .toBuffer(),
    ),
  );
  const icoBuf = await pngToIco(icoSources);
  await fs.writeFile(path.join(PUBLIC, 'favicon.ico'), icoBuf);
  console.log(`  wrote favicon.ico (16+32+48 multi-res, ${icoBuf.length} bytes)`);

  // Web app manifest
  const manifest = {
    name: 'Promptos',
    short_name: 'Promptos',
    icons: [
      {src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png'},
      {src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png'},
    ],
    theme_color: PURPLE,
    background_color: '#FAF8F5',
    display: 'standalone',
  };
  await fs.writeFile(
    path.join(PUBLIC, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2),
  );
  console.log('  wrote site.webmanifest');

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
