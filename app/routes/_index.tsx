import type {Route} from './+types/_index';
import {CATALOG_STATS} from '~/lib/catalog-stats';
import {getOgImageUrl} from '~/lib/og-images';
import {HeroV2} from '~/components/promptos/HeroV2';
import {MarqueeStrip} from '~/components/promptos/MarqueeStrip';
import {TwoSidesSection} from '~/components/promptos/TwoSidesSection';
import {DoYourselfAFavor} from '~/components/promptos/DoYourselfAFavor';
import {ThreeTiersSection} from '~/components/promptos/ThreeTiersSection';
import {WhyPromptos} from '~/components/promptos/WhyPromptos';
import {HowItWorks} from '~/components/promptos/HowItWorks';
import {PackGridV2} from '~/components/promptos/PackGridV2';
import {GuideHomeStrip} from '~/components/promptos/GuideHomeStrip';
import {ThreePathsComparison} from '~/components/promptos/ThreePathsComparison';
import {ReviewCarousel} from '~/components/promptos/ReviewCarousel';
import {BundlePushCinematic} from '~/components/promptos/BundlePushCinematic';
import {WhoEditorial} from '~/components/promptos/WhoEditorial';
import {MethodSnippet} from '~/components/promptos/MethodSnippet';
import {FounderNote} from '~/components/promptos/FounderNote';
import {FaqV2} from '~/components/promptos/FaqV2';
import {NewsletterCTA} from '~/components/promptos/NewsletterCTA';

const {totalProductsPublicClaim, totalPrompts, totalPlaybookPages} = CATALOG_STATS;
const META_DESCRIPTION = `${totalProductsPublicClaim} products. ${totalPrompts} prompts. ${totalPlaybookPages.toLocaleString()}+ pages of playbooks. Built for operators who use AI every day and want to ship faster. Works with Claude, ChatGPT, Gemini, Grok, and every major LLM.`;
const OG_DESCRIPTION = `${totalProductsPublicClaim} products. ${totalPrompts} prompts. ${totalPlaybookPages.toLocaleString()}+ pages of playbooks. Built for operators who ship every day.`;
// Homepage shares the Everything Bundle OG as its hero share image —
// it's the most representative single image of the whole catalog.
const HOMEPAGE_OG = getOgImageUrl('everything');

export const meta: Route.MetaFunction = () => [
  {title: 'Promptos · Prompts and playbooks that actually work'},
  {name: 'description', content: META_DESCRIPTION},
  {property: 'og:title', content: 'Promptos · Prompts and playbooks that actually work'},
  {property: 'og:description', content: OG_DESCRIPTION},
  {property: 'og:type', content: 'website'},
  {property: 'og:url', content: 'https://promptos.store/'},
  {name: 'twitter:card', content: 'summary_large_image'},
  {name: 'twitter:site', content: '@promptos'},
  ...(HOMEPAGE_OG ? [
    {property: 'og:image', content: HOMEPAGE_OG},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {name: 'twitter:image', content: HOMEPAGE_OG},
  ] : []),
  {tagName: 'link', rel: 'canonical', href: 'https://promptos.store/'},
];

export default function Homepage() {
  return (
    <main id="main" className="page is-active" data-page="home">
      <HeroV2 />
      <MarqueeStrip />
      <TwoSidesSection />
      <DoYourselfAFavor />
      <ThreeTiersSection />
      <WhyPromptos />
      <HowItWorks />
      <PackGridV2 />
      <GuideHomeStrip />
      <ThreePathsComparison />
      <BundlePushCinematic />
      <ReviewCarousel />
      <WhoEditorial />
      <MethodSnippet />
      <FounderNote />
      <FaqV2 />
      <NewsletterCTA />
    </main>
  );
}
