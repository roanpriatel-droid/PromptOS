/**
 * Subtle SVG fractal-noise overlay used over gradient sections so they
 * don't look like generic-AI gradient slop. ~3% opacity, mix-blend-overlay.
 *
 * Place inside any element with `position: relative` (or otherwise
 * containing-blocked) and the texture covers it via `inset: 0`.
 *
 * Visual implementation lives in promptos-v39a.css under .v39a-noise-overlay.
 */
type Props = {
  /** Optional opacity override (default in CSS = 0.03). */
  opacity?: number;
};

export function NoiseTexture({opacity}: Props = {}) {
  return (
    <div
      className="v39a-noise-overlay"
      aria-hidden
      style={opacity != null ? {opacity} : undefined}
    />
  );
}
