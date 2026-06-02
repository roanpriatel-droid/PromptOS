/**
 * v3.9a Phase B — designed product covers.
 *
 * The existing Cover components (PackCover, AuthorityCover, BundleCover,
 * GuideCover) check this registry first; if a slug has a v3.9 SVG
 * available, they render that via this component. Otherwise they fall
 * back to their existing inline-SVG character-glyph treatment.
 *
 * The SVGs live in public/covers/<slug>.svg and are served as static
 * assets. They render at 1:1 aspect ratio in any card container.
 */

const V39_COVER_SLUGS = new Set<string>([
  // Phase B prototype slugs shipped in v3.9a
  'marketer',
  'personal-brand',
  'everything',
  // v3.9b will add: writer, developer, solopreneur, content-creator,
  // ai-power-user, productivity, plus all guides, content-engine,
  // high-ticket-finder, packs/authority/guides bundles.
]);

export function hasV39Cover(slug: string): boolean {
  return V39_COVER_SLUGS.has(slug);
}

type Props = {
  slug: string;
  /** Alt text for accessibility. */
  alt: string;
  /** Optional className passthrough. */
  className?: string;
};

export function CoverV39({slug, alt, className}: Props) {
  return (
    <img
      src={`/covers/${slug}.svg`}
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
