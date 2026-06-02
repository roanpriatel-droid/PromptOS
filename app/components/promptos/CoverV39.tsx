/**
 * v3.9a Phase B — designed product covers.
 *
 * The existing Cover components (PackCover, AuthorityCover, BundleCover,
 * GuideCover) check this registry first; if a slug has a v3.9 SVG
 * available, they render that via this component. Otherwise they fall
 * back to their existing inline-SVG character-glyph treatment.
 *
 * Why we import from app/assets instead of pointing at /covers/<slug>.svg:
 * Oxygen does not serve the project's public/ directory at the URL root
 * (verified post-v3.9a deploy — favicon.ico, og-default.png, apple-touch-
 * icon.png all 404 at /). Vite-bundled assets from app/assets/ get hashed
 * URLs that Oxygen serves correctly. The public/covers/*.svg copies are
 * retained on disk in case a later cut needs the raw paths (e.g. OG
 * image regeneration scripts).
 */

import marketerCover from '~/assets/covers/marketer.svg';
import personalBrandCover from '~/assets/covers/personal-brand.svg';
import everythingCover from '~/assets/covers/everything.svg';

const V39_COVER_MAP: Record<string, string> = {
  // Phase B prototype slugs shipped in v3.9a
  marketer: marketerCover,
  'personal-brand': personalBrandCover,
  everything: everythingCover,
  // v3.9b will add: writer, developer, solopreneur, content-creator,
  // ai-power-user, productivity, plus all guides, content-engine,
  // high-ticket-finder, packs/authority/guides bundles.
};

export function hasV39Cover(slug: string): boolean {
  return slug in V39_COVER_MAP;
}

type Props = {
  slug: string;
  /** Alt text for accessibility. */
  alt: string;
  /** Optional className passthrough. */
  className?: string;
};

export function CoverV39({slug, alt, className}: Props) {
  const src = V39_COVER_MAP[slug];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  );
}
