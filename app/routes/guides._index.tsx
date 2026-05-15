import type {Route} from './+types/guides._index';
import {GuideGrid} from '~/components/promptos/GuideGrid';
import {BundleSelector} from '~/components/promptos/BundleSelector';
import {SectionFade} from '~/components/promptos/SectionFade';
import {ThreePathsComparison} from '~/components/promptos/ThreePathsComparison';

export const meta: Route.MetaFunction = () => [
  {title: 'Playbooks · Promptos'},
  {
    name: 'description',
    content:
      'Real playbooks. Real businesses. Real outcomes. Eight playbooks for the business you want to build, agency, solo, or premium.',
  },
];

export default function GuidesIndex() {
  return (
    <main id="main" className="page is-active" data-page="guides-index">
      <section className="catalog-hero">
        <SectionFade as="div" className="catalog-hero-inner">
          <span className="label section-eyebrow">Playbooks</span>
          <h1>Real playbooks. Real businesses. Real outcomes.</h1>
          <p>
            Eight playbooks covering the most-asked-about businesses to start in 2026, agency, solo,
            and premium models. Each one is a complete operating system: positioning, sales, pricing,
            delivery, growth.
          </p>
        </SectionFade>
      </section>

      <section className="catalog-body">
        <div className="catalog-body-inner">
          <GuideGrid />
        </div>
      </section>

      <ThreePathsComparison />

      <BundleSelector heading="Or get more than one." />
    </main>
  );
}
