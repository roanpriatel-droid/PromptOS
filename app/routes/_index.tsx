import type {Route} from './+types/_index';
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

export const meta: Route.MetaFunction = () => [
  {title: 'Promptos · Prompts and playbooks that actually work'},
  {
    name: 'description',
    content:
      '20 products. 535 prompts. 1,080+ pages of playbooks. Built for operators who use AI every day and want to ship faster. Works with Claude, ChatGPT, Gemini, Grok, and every major LLM.',
  },
  {property: 'og:title', content: 'Promptos · Prompts and playbooks that actually work'},
  {property: 'og:description', content: '20 products. 535 prompts. 1,080+ pages of playbooks. Built for operators who ship every day.'},
  {property: 'og:type', content: 'website'},
  {property: 'og:url', content: 'https://promptos.store/'},
  {name: 'twitter:card', content: 'summary_large_image'},
  {name: 'twitter:site', content: '@promptos'},
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
