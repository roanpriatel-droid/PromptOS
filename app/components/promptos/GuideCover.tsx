/**
 * Inline SVG cover for a playbook. Distinct from pack covers — guide covers
 * lean more "business book": bold serif "G" + number, gold rule, and the
 * "Playbook" wordmark.
 */
import type {Guide} from '~/lib/catalog';

const SERIF = "'Fraunces', 'Instrument Serif', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const CREAM = '#FAFAFA';
const DIM = 'rgba(250,250,250,0.62)';
const FAINT = 'rgba(255,255,255,0.18)';
const RULE = '#EC4899';

export function GuideCover({guide}: {guide: Guide}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={guide.name}
    >
      <rect width="800" height="1000" fill={guide.color} />
      <rect
        x="0.5"
        y="0.5"
        width="799"
        height="999"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
      />

      {/* Top wordmark + volume */}
      <g transform="translate(48, 56)">
        <path
          d="M 0 8 L 14 18 L 0 28"
          fill="none"
          stroke={RULE}
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
        fontSize="11"
        fontWeight="600"
        letterSpacing="3"
        fill={DIM}
      >
        PLAYBOOK · {guide.number}
      </text>
      <line x1="48" y1="120" x2="752" y2="120" stroke={FAINT} />

      {/* Massive guide number */}
      <text
        x="400"
        y="520"
        textAnchor="middle"
        fontFamily={SERIF}
        fontStyle={guide.italic ? 'italic' : undefined}
        fontSize="380"
        fontWeight="500"
        letterSpacing="-18"
        fill={CREAM}
      >
        {guide.number}
      </text>

      {/* Decorative glyph rule */}
      <text
        x="400"
        y="600"
        textAnchor="middle"
        fontFamily={SERIF}
        fontStyle="italic"
        fontSize="72"
        fontWeight="400"
        fill={RULE}
      >
        {guide.glyph}
      </text>

      {/* Pink + thin rule */}
      <line x1="48" y1="680" x2="752" y2="680" stroke={RULE} strokeWidth="2" />
      <line x1="48" y1="688" x2="752" y2="688" stroke={FAINT} />

      {/* Title block, multi-line aware */}
      <text
        x="48"
        y="760"
        fontFamily={SERIF}
        fontSize="54"
        fontWeight="500"
        letterSpacing="-2"
        fill={CREAM}
      >
        {guide.name.replace(/^The /, '')}
      </text>

      <text
        x="48"
        y="820"
        fontFamily={SANS}
        fontSize="14"
        fontWeight="500"
        letterSpacing="-0.2"
        fill={DIM}
      >
        {guide.role} · {guide.pageCount} pages · {guide.chapterCount} chapters
      </text>

      <text
        x="48"
        y="858"
        fontFamily={SANS}
        fontSize="14"
        fontWeight="500"
        letterSpacing="-0.2"
        fill={DIM}
      >
        {guide.templateCount} templates included
      </text>

      <text
        x="752"
        y="858"
        textAnchor="end"
        fontFamily={SANS}
        fontSize="26"
        fontWeight="700"
        letterSpacing="-0.6"
        fill={CREAM}
      >
        ${guide.priceUSD}
      </text>

      <line x1="48" y1="900" x2="752" y2="900" stroke={FAINT} />
      <text
        x="48"
        y="940"
        fontFamily={SANS}
        fontSize="11"
        fontWeight="600"
        letterSpacing="2.4"
        fill={DIM}
      >
        PROMPTOS / PLAYBOOKS / {guide.slug.toUpperCase()}
      </text>
      <text
        x="752"
        y="940"
        textAnchor="end"
        fontFamily={SANS}
        fontSize="11"
        fontWeight="600"
        letterSpacing="2"
        fill={DIM}
      >
        INSTANT PDF
      </text>
    </svg>
  );
}
