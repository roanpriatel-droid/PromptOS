/**
 * Lucide-style stroke icons used across the storefront, inlined to avoid a
 * CDN dependency. Mirror of the ICONS object in the design hand-off.
 */

type IconProps = {
  className?: string;
  size?: number;
};

const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

function svg(d: string, size: number, className?: string) {
  return (
    <svg {...baseProps} width={size} height={size} className={className}>
      <path d={d} />
    </svg>
  );
}

export function ZapIcon({size = 28, className}: IconProps) {
  return svg('M13 2L3 14h7l-1 8 10-12h-7l1-8z', size, className);
}

export function TargetIcon({size = 28, className}: IconProps) {
  return (
    <svg {...baseProps} width={size} height={size} className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function BotIcon({size = 28, className}: IconProps) {
  return (
    <svg {...baseProps} width={size} height={size} className={className}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M12 8V4M8 4h8M9 14h.01M15 14h.01M3 13h-1M22 13h-1" />
    </svg>
  );
}

export function PlusIcon({size = 24, className}: IconProps) {
  return svg('M12 5v14M5 12h14', size, className);
}

export function CheckIcon({size = 24, className}: IconProps) {
  return svg('M20 6L9 17l-5-5', size, className);
}
