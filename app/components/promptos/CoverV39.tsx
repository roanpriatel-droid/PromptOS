/**
 * v3.9a Phase B (3 prototype slugs) + v3.9b Part 1 (remaining 19 slugs)
 * — registry of all designed product covers.
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

// v3.9a (Phase B prototypes)
import marketerCover from '~/assets/covers/marketer.svg';
import personalBrandCover from '~/assets/covers/personal-brand.svg';
import everythingCover from '~/assets/covers/everything.svg';

// v3.9b — remaining packs
import writerCover from '~/assets/covers/writer.svg';
import developerCover from '~/assets/covers/developer.svg';
import solopreneurCover from '~/assets/covers/solopreneur.svg';
import contentCreatorCover from '~/assets/covers/content-creator.svg';
import aiPowerUserCover from '~/assets/covers/ai-power-user.svg';
import productivityCover from '~/assets/covers/productivity.svg';

// v3.9b — playbooks
import aiAutomationAgencyCover from '~/assets/covers/ai-automation-agency.svg';
import aiAgentBuilderCover from '~/assets/covers/ai-agent-builder.svg';
import webDesignAgencyCover from '~/assets/covers/web-design-agency.svg';
import digitalProductsCover from '~/assets/covers/digital-products.svg';
import newsletterBusinessCover from '~/assets/covers/newsletter-business.svg';
import facelessContentCover from '~/assets/covers/faceless-content.svg';
import saasSideProjectCover from '~/assets/covers/saas-side-project.svg';
import coachingConsultingCover from '~/assets/covers/coaching-consulting.svg';

// v3.9b — Authority + bundles
import contentEngineCover from '~/assets/covers/content-engine.svg';
import highTicketFinderCover from '~/assets/covers/high-ticket-finder.svg';
import packsBundleCover from '~/assets/covers/packs.svg';
import authorityBundleCover from '~/assets/covers/authority.svg';
import guidesBundleCover from '~/assets/covers/guides.svg';

const V39_COVER_MAP: Record<string, string> = {
  // v3.9a prototypes
  marketer: marketerCover,
  'personal-brand': personalBrandCover,
  everything: everythingCover,

  // v3.9b packs
  writer: writerCover,
  developer: developerCover,
  solopreneur: solopreneurCover,
  'content-creator': contentCreatorCover,
  'ai-power-user': aiPowerUserCover,
  productivity: productivityCover,

  // v3.9b playbooks
  'ai-automation-agency': aiAutomationAgencyCover,
  'ai-agent-builder': aiAgentBuilderCover,
  'web-design-agency': webDesignAgencyCover,
  'digital-products': digitalProductsCover,
  'newsletter-business': newsletterBusinessCover,
  'faceless-content': facelessContentCover,
  'saas-side-project': saasSideProjectCover,
  'coaching-consulting': coachingConsultingCover,

  // v3.9b Authority (Personal Brand is in v3.9a above)
  'content-engine': contentEngineCover,
  'high-ticket-finder': highTicketFinderCover,

  // v3.9b bundles (Everything is in v3.9a above)
  packs: packsBundleCover,
  authority: authorityBundleCover,
  guides: guidesBundleCover,
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
