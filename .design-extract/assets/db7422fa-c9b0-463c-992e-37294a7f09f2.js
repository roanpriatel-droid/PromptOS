// ============================================================
// Pack data + inline SVG cover renderer
// Inline so Geist/Instrument Serif (loaded by the page) apply.
// ============================================================

const PACKS = [
  { n: "01", slug: "marketers",   color: "#6B46C1", tone:"purple", glyph: "%",   name: "The Marketers",   role: "For marketers",            count: 75, price: 39, italic: false,
    tagline: "75 prompts for paid acquisition, lifecycle, brand, and analytics. Written by marketers who shipped them.",
    desc: "Briefs, ad copy, lifecycle, attribution. Real campaign use.",
  },
  { n: "02", slug: "writers",     color: "#C2410C", tone:"rust", glyph: "¶",   name: "The Writers",     role: "For writers",              count: 65, price: 35, italic: true,
    tagline: "65 prompts that sharpen first drafts, kill cliché, and find the angle.",
    desc: "Drafts, editing, voice, structure. For copy and longform alike.",
  },
  { n: "03", slug: "developers",  color: "#15803D", tone:"forest", glyph: "{ }", name: "The Developers",  role: "For engineers",            count: 60, price: 35, italic: false,
    tagline: "60 prompts for shipping software: code review, debugging, design docs, refactors.",
    desc: "Reviews, refactors, design docs, postmortems, debugging.",
  },
  { n: "04", slug: "founders",    color: "#CA8A04", tone:"gold", glyph: "§",   name: "The Founders",    role: "For founders",             count: 55, price: 29, italic: false,
    tagline: "55 prompts for solo founders: investor updates, hiring loops, customer interviews, pricing.",
    desc: "Investor updates, customer calls, hiring, pricing, GTM.",
  },
  { n: "05", slug: "creators",    color: "#EC4899", tone:"pink", glyph: "▶",   name: "The Creators",    role: "For creators",             count: 60, price: 35, italic: true,
    tagline: "60 prompts for video, podcasts, and social. Hooks, outlines, descriptions, repurposing.",
    desc: "Hooks, outlines, descriptions, repurposing across channels.",
  },
  { n: "06", slug: "operators",   color: "#475569", tone:"slate", glyph: "□",   name: "The Operators",   role: "For operators",            count: 60, price: 35, italic: false,
    tagline: "60 prompts for knowledge work: meeting notes, weekly reviews, briefs, decisions, planning.",
    desc: "Meetings, planning, briefs, decisions, weekly reviews.",
  },
  { n: "07", slug: "power-users", color: "#3B1F6B", tone:"plum", glyph: "∞",   name: "The Power Users", role: "For advanced AI users",    count: 75, price: 39, italic: true,
    tagline: "75 advanced patterns: chain-of-thought, eval harnesses, multi-step agents, prompt grading.",
    desc: "Advanced patterns, evals, chains, custom rubrics.",
  },
];

const SERIF = "'Instrument Serif', Georgia, serif";
const SANS  = "'Geist', system-ui, sans-serif";

function packCoverSVG(p) {
  const ital = p.italic ? 'font-style="italic"' : '';
  const CREAM = "#FAFAFA";
  const DIM = "rgba(250,250,250,0.62)";
  const FAINT = "rgba(255,255,255,0.18)";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${p.name}">
    <rect width="800" height="1000" fill="${p.color}"/>
    <rect x="0.5" y="0.5" width="799" height="999" fill="none" stroke="rgba(255,255,255,0.08)"/>
    <g transform="translate(48, 56)">
      <path d="M 0 8 L 14 18 L 0 28" fill="none" stroke="#EC4899" stroke-width="4" stroke-linecap="square"/>
      <rect x="20" y="6" width="3" height="24" fill="${CREAM}"/>
      <text x="36" y="26" font-family="${SANS}" font-size="18" font-weight="600" letter-spacing="-0.3" fill="${CREAM}">promptos</text>
    </g>
    <text x="752" y="78" text-anchor="end" font-family="${SANS}" font-size="12" font-weight="500" letter-spacing="2" fill="${DIM}">PACK № ${p.n}</text>
    <line x1="48" y1="120" x2="752" y2="120" stroke="${FAINT}"/>
    <text x="400" y="560" text-anchor="middle" font-family="${SERIF}" ${ital} font-size="500" font-weight="400" letter-spacing="-20" fill="${CREAM}">${p.n}</text>
    <text x="400" y="660" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="80" font-weight="400" fill="${CREAM}">${p.glyph}</text>
    <line x1="48" y1="780" x2="752" y2="780" stroke="${FAINT}"/>
    <text x="48" y="852" font-family="${SERIF}" font-size="64" font-weight="400" letter-spacing="-2" fill="${CREAM}">${p.name}</text>
    <text x="48" y="900" font-family="${SANS}" font-size="15" font-weight="500" letter-spacing="-0.2" fill="${DIM}">${p.role}  ·  ${p.count} prompts</text>
    <text x="752" y="900" text-anchor="end" font-family="${SANS}" font-size="22" font-weight="600" letter-spacing="-0.4" fill="${CREAM}">$${p.price}</text>
    <text x="48" y="952" font-family="${SANS}" font-size="10" font-weight="500" letter-spacing="2" fill="${DIM}">PROMPTOS / ${p.slug.toUpperCase()}</text>
  </svg>`;
}

function bundleCoverSVG() {
  const CREAM = "#FAFAFA";
  const DIM = "rgba(250,250,250,0.62)";
  const FAINT = "rgba(255,255,255,0.18)";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" role="img" aria-label="The Complete Bundle">
    <rect width="800" height="1000" fill="#1F2937"/>
    <rect x="0.5" y="0.5" width="799" height="999" fill="none" stroke="rgba(255,255,255,0.08)"/>
    <g transform="translate(48, 56)">
      <path d="M 0 8 L 14 18 L 0 28" fill="none" stroke="#EC4899" stroke-width="4" stroke-linecap="square"/>
      <rect x="20" y="6" width="3" height="24" fill="${CREAM}"/>
      <text x="36" y="26" font-family="${SANS}" font-size="18" font-weight="600" letter-spacing="-0.3" fill="${CREAM}">promptos</text>
    </g>
    <text x="752" y="78" text-anchor="end" font-family="${SANS}" font-size="12" font-weight="500" letter-spacing="2" fill="${DIM}">THE COMPLETE BUNDLE</text>
    <line x1="48" y1="120" x2="752" y2="120" stroke="${FAINT}"/>
    <text x="100" y="320" font-family="${SERIF}" font-size="160" letter-spacing="-8" fill="${CREAM}">01</text>
    <text x="270" y="320" font-family="${SERIF}" font-size="160" letter-spacing="-8" fill="rgba(250,250,250,0.78)">02</text>
    <text x="440" y="320" font-family="${SERIF}" font-style="italic" font-size="160" letter-spacing="-8" fill="rgba(250,250,250,0.88)">03</text>
    <text x="610" y="320" font-family="${SERIF}" font-size="160" letter-spacing="-8" fill="#EC4899">04</text>
    <text x="100" y="520" font-family="${SERIF}" font-style="italic" font-size="160" letter-spacing="-8" fill="rgba(250,250,250,0.6)">05</text>
    <text x="270" y="520" font-family="${SERIF}" font-size="160" letter-spacing="-8" fill="${CREAM}">06</text>
    <text x="440" y="520" font-family="${SERIF}" font-size="160" letter-spacing="-8" fill="rgba(250,250,250,0.85)">07</text>
    <text x="680" y="540" font-family="${SERIF}" font-style="italic" font-size="200" text-anchor="middle" fill="#EC4899">∞</text>
    <line x1="48" y1="660" x2="752" y2="660" stroke="${FAINT}"/>
    <text x="48" y="780" font-family="${SERIF}" font-size="120" letter-spacing="-4" fill="${CREAM}">450 <tspan font-style="italic" fill="rgba(250,250,250,0.7)">prompts.</tspan></text>
    <line x1="48" y1="820" x2="752" y2="820" stroke="${FAINT}"/>
    <text x="48" y="876" font-family="${SANS}" font-size="20" font-weight="600" letter-spacing="-0.4" fill="${CREAM}">Every pack. One price.</text>
    <text x="48" y="906" font-family="${SANS}" font-size="15" font-weight="500" letter-spacing="-0.2" fill="${DIM}">Seven packs. Tested. Editable. Yours.</text>
    <text x="752" y="876" text-anchor="end" font-family="${SANS}" font-size="20" font-weight="500" letter-spacing="-0.4" fill="${DIM}" text-decoration="line-through">$253</text>
    <text x="752" y="916" text-anchor="end" font-family="${SANS}" font-size="40" font-weight="700" letter-spacing="-1.2" fill="${CREAM}">$99</text>
    <text x="48" y="958" font-family="${SANS}" font-size="10" font-weight="500" letter-spacing="2" fill="${DIM}">PROMPTOS / THE COMPLETE BUNDLE</text>
  </svg>`;
}

function logoWordmark(color = "#1F2937") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 96">
    <g transform="translate(0, 24)">
      <path d="M 0 8 L 18 18 L 0 28" fill="none" stroke="#EC4899" stroke-width="6" stroke-linecap="square"/>
      <rect x="24" y="6" width="4" height="24" fill="${color}"/>
    </g>
    <text x="44" y="66" font-family="${SANS}" font-weight="700" font-size="52" letter-spacing="-1.8" fill="${color}">promptos</text>
  </svg>`;
}

// Lucide-style stroke icon set (inlined to avoid CDN dependency)
const ICONS = {
  zap:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  bot:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8V4M8 4h8M9 14h.01M15 14h.01M3 13h-1M22 13h-1"/></svg>',
  plus:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
  check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  twitter:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.78 0c2.21-1.5 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"/></svg>',
};

if (typeof window !== 'undefined') {
  Object.assign(window, { PACKS, packCoverSVG, bundleCoverSVG, logoWordmark, ICONS });
}
