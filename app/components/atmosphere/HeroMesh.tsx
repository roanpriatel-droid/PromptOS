import {type ReactNode} from 'react';

type Props = {
  children: ReactNode;
  /** Pass through extra className. */
  className?: string;
  /** Render the wrapper as something other than a section. */
  as?: 'section' | 'div' | 'header';
  /** Style overrides. */
  style?: React.CSSProperties;
};

/**
 * CSS-animated mesh hero background (Phase C path B in the v3.9 spec).
 * The actual gradient + drift keyframes are defined in
 * promptos-v39a.css under .v39a-hero-mesh. This component is the React
 * wrapper that applies the class and stacks children above the mesh.
 *
 * Why path B instead of WebGL:
 * - Universal browser support, no SSR issues, no shader compile cost.
 * - Pure CSS keyframes ride on the compositor and respect
 *   prefers-reduced-motion at the stylesheet level.
 * - Visual delta from path A (shader mesh) is small at the brand's
 *   palette range and the user has explicitly asked us not to ship
 *   broken in pursuit of fancier tech.
 */
export function HeroMesh({children, className, as = 'section', style}: Props) {
  const Tag = as as 'section';
  return (
    <Tag
      className={`v39a-hero-mesh${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
