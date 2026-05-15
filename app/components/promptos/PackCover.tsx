/**
 * Inline SVG renderer for a Promptos pack cover.
 *
 * Mirrors the exact composition from the Claude design hand-off: pink cursor,
 * "promptos" wordmark, "PACK № NN" label, big serif number + italic glyph,
 * pack name + role + price.
 */

import type {Pack} from '~/lib/packs';

const SERIF = "'Instrument Serif', Georgia, serif";
const SANS = "'Geist', system-ui, sans-serif";
const CREAM = '#FAFAFA';
const DIM = 'rgba(250,250,250,0.62)';
const FAINT = 'rgba(255,255,255,0.18)';

export function PackCover({pack}: {pack: Pack}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={pack.name}
    >
      <rect width="800" height="1000" fill={pack.color} />
      <rect
        x="0.5"
        y="0.5"
        width="799"
        height="999"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
      />
      <g transform="translate(48, 56)">
        <path
          d="M 0 8 L 14 18 L 0 28"
          fill="none"
          stroke="#EC4899"
          strokeWidth="4"
          strokeLinecap="square"
        />
        <rect x="20" y="6" width="3" height="24" fill={CREAM} />
        <text
          x="36"
          y="26"
          fontFamily={SANS}
          fontSize="18"
          fontWeight="600"
          letterSpacing="-0.3"
          fill={CREAM}
        >
          promptos
        </text>
      </g>
      <text
        x="752"
        y="78"
        textAnchor="end"
        fontFamily={SANS}
        fontSize="12"
        fontWeight="500"
        letterSpacing="2"
        fill={DIM}
      >
        PACK № {pack.number}
      </text>
      <line x1="48" y1="120" x2="752" y2="120" stroke={FAINT} />
      <text
        x="400"
        y="560"
        textAnchor="middle"
        fontFamily={SERIF}
        fontStyle={pack.italic ? 'italic' : undefined}
        fontSize="500"
        fontWeight="400"
        letterSpacing="-20"
        fill={CREAM}
      >
        {pack.number}
      </text>
      <text
        x="400"
        y="660"
        textAnchor="middle"
        fontFamily={SERIF}
        fontStyle="italic"
        fontSize="80"
        fontWeight="400"
        fill={CREAM}
      >
        {pack.glyph}
      </text>
      <line x1="48" y1="780" x2="752" y2="780" stroke={FAINT} />
      <text
        x="48"
        y="852"
        fontFamily={SERIF}
        fontSize="64"
        fontWeight="400"
        letterSpacing="-2"
        fill={CREAM}
      >
        {pack.name}
      </text>
      <text
        x="48"
        y="900"
        fontFamily={SANS}
        fontSize="15"
        fontWeight="500"
        letterSpacing="-0.2"
        fill={DIM}
      >
        {pack.role} · {pack.promptCount} prompts
      </text>
      <text
        x="752"
        y="900"
        textAnchor="end"
        fontFamily={SANS}
        fontSize="22"
        fontWeight="600"
        letterSpacing="-0.4"
        fill={CREAM}
      >
        ${pack.priceUSD}
      </text>
      <text
        x="48"
        y="952"
        fontFamily={SANS}
        fontSize="10"
        fontWeight="500"
        letterSpacing="2"
        fill={DIM}
      >
        PROMPTOS / {pack.slug.toUpperCase()}
      </text>
    </svg>
  );
}
