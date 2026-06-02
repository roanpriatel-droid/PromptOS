/**
 * Inline SVG cover for the complete bundle — dark ink background with a wall
 * of serif numbers and the "450 prompts" line.
 *
 * v3.9a Phase B — if a designed v3.9 cover exists for the slug
 * (currently: 'everything'), render that instead. Falls back to the
 * inline composition below for the other 3 bundles.
 */
import {CoverV39, hasV39Cover} from './CoverV39';

type BundleCoverProps = {
  /** When given, opts into the v3.9 designed cover lookup. */
  slug?: string;
  /** Optional alt text for accessibility (only used in the v3.9 path). */
  alt?: string;
};

const SERIF = "'Instrument Serif', Georgia, serif";
const SANS = "'Geist', system-ui, sans-serif";
const CREAM = '#FAFAFA';
const DIM = 'rgba(250,250,250,0.62)';
const FAINT = 'rgba(255,255,255,0.18)';

export function BundleCover({slug, alt}: BundleCoverProps = {}) {
  if (slug && hasV39Cover(slug)) {
    return <CoverV39 slug={slug} alt={alt ?? 'Promptos bundle'} />;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="The Complete Bundle"
    >
      <rect width="800" height="1000" fill="#1F2937" />
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
        THE COMPLETE BUNDLE
      </text>
      <line x1="48" y1="120" x2="752" y2="120" stroke={FAINT} />
      <text x="100" y="320" fontFamily={SERIF} fontSize="160" letterSpacing="-8" fill={CREAM}>01</text>
      <text x="270" y="320" fontFamily={SERIF} fontSize="160" letterSpacing="-8" fill="rgba(250,250,250,0.78)">02</text>
      <text x="440" y="320" fontFamily={SERIF} fontStyle="italic" fontSize="160" letterSpacing="-8" fill="rgba(250,250,250,0.88)">03</text>
      <text x="610" y="320" fontFamily={SERIF} fontSize="160" letterSpacing="-8" fill="#EC4899">04</text>
      <text x="100" y="520" fontFamily={SERIF} fontStyle="italic" fontSize="160" letterSpacing="-8" fill="rgba(250,250,250,0.6)">05</text>
      <text x="270" y="520" fontFamily={SERIF} fontSize="160" letterSpacing="-8" fill={CREAM}>06</text>
      <text x="440" y="520" fontFamily={SERIF} fontSize="160" letterSpacing="-8" fill="rgba(250,250,250,0.85)">07</text>
      <text x="680" y="540" fontFamily={SERIF} fontStyle="italic" fontSize="200" textAnchor="middle" fill="#EC4899">∞</text>
      <line x1="48" y1="660" x2="752" y2="660" stroke={FAINT} />
      <text x="48" y="780" fontFamily={SERIF} fontSize="120" letterSpacing="-4" fill={CREAM}>
        450 <tspan fontStyle="italic" fill="rgba(250,250,250,0.7)">prompts.</tspan>
      </text>
      <line x1="48" y1="820" x2="752" y2="820" stroke={FAINT} />
      <text x="48" y="876" fontFamily={SANS} fontSize="20" fontWeight="600" letterSpacing="-0.4" fill={CREAM}>Every pack. One price.</text>
      <text x="48" y="906" fontFamily={SANS} fontSize="15" fontWeight="500" letterSpacing="-0.2" fill={DIM}>Seven packs. Tested. Editable. Yours.</text>
      <text x="752" y="876" textAnchor="end" fontFamily={SANS} fontSize="20" fontWeight="500" letterSpacing="-0.4" fill={DIM} textDecoration="line-through">$253</text>
      <text x="752" y="916" textAnchor="end" fontFamily={SANS} fontSize="40" fontWeight="700" letterSpacing="-1.2" fill={CREAM}>$99</text>
      <text x="48" y="958" fontFamily={SANS} fontSize="10" fontWeight="500" letterSpacing="2" fill={DIM}>PROMPTOS / THE COMPLETE BUNDLE</text>
    </svg>
  );
}
