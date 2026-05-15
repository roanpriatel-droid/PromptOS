/**
 * The Promptos wordmark — pink cursor mark + ink rule + "promptos" type.
 * Renders inline so the loaded Geist font applies to the SVG <text>.
 */

type WordmarkProps = {
  /** Render colour for the text + rule. Defaults to ink. */
  color?: string;
  /** Render width in px. Default 132 — matches the nav. */
  width?: number;
};

export function Wordmark({color = '#1F2937', width = 132}: WordmarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 96"
      width={width}
      height={(width * 96) / 360}
      aria-label="Promptos"
      role="img"
    >
      <g transform="translate(0, 24)">
        <path
          d="M 0 8 L 18 18 L 0 28"
          fill="none"
          stroke="#EC4899"
          strokeWidth="6"
          strokeLinecap="square"
        />
        <rect x="24" y="6" width="4" height="24" fill={color} />
      </g>
      <text
        x="44"
        y="66"
        fontFamily="Geist, system-ui, sans-serif"
        fontWeight="700"
        fontSize="52"
        letterSpacing="-1.8"
        fill={color}
      >
        promptos
      </text>
    </svg>
  );
}
