// Pull every <style>...</style> block out of the extracted design template,
// concatenate them, swap the bundled font UUID URLs for Google Fonts
// equivalents, and write the result to design.css for verbatim adoption.

import fs from 'node:fs';

const SRC = 'C:/Users/roanp/Downloads/promptos_storefront/.design-extract/template.html';
const OUT_CSS = 'C:/Users/roanp/Downloads/promptos_storefront/.design-extract/design.css';
const OUT_BODY = 'C:/Users/roanp/Downloads/promptos_storefront/.design-extract/body.html';

const html = fs.readFileSync(SRC, 'utf8');

const styleBlocks = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(
  (m) => m[1],
);
let css = styleBlocks.join('\n\n/* ---- next style block ---- */\n\n');

// Drop the bundled @font-face declarations entirely — they reference UUIDs
// that point at blob URLs in the bundler runtime. Replace with a Google
// Fonts import for Geist, Instrument Serif, and JetBrains Mono.
css = css.replace(/\/\*[^*]*\*\/\s*@font-face\s*\{[^}]*\}/g, (m) =>
  m.includes('font-family:') ? '' : m,
);
css = css.replace(/@font-face\s*\{[^}]*\}/g, '');
css = css.replace(/(^|\n)\s*\/\* (cyrillic|cyrillic-ext|vietnamese|latin|latin-ext|greek|greek-ext) \*\//g, '');

const googleFontsImport = `@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap');\n\n`;
css = googleFontsImport + css.trimStart();

fs.writeFileSync(OUT_CSS, css, 'utf8');
console.log('design.css bytes:', css.length);

// Also extract <body> for reference.
const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
fs.writeFileSync(OUT_BODY, bodyMatch ? bodyMatch[1] : '', 'utf8');
console.log('body.html bytes:', (bodyMatch?.[1] ?? '').length);
