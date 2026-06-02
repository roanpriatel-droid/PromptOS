import type {Route} from './+types/bundles._index';
import {BundleSelector} from '~/components/promptos/BundleSelector';
import {CompareBundlesTable} from '~/components/promptos/CompareBundlesTable';
import {SectionFade} from '~/components/promptos/SectionFade';
import {BUNDLES, PACKS, GUIDES, AUTHORITY, MEGA_BUNDLE} from '~/lib/catalog';
import {CATALOG_STATS} from '~/lib/catalog-stats';
import {AnimatedCounter} from '~/components/promptos/AnimatedCounter';
import {JsonLd, itemListSchema, SITE_URL} from '~/components/promptos/JsonLd';

export const meta: Route.MetaFunction = () => [
  {title: 'Bundles · Promptos'},
  {
    name: 'description',
    content:
      'Four bundles for four scopes. Packs ($99), Authority ($249), Guides ($497), or Everything ($798). Save up to $914 vs. buying separately.',
  },
];

export default function BundlesIndex() {
  const totalPrompts =
    PACKS.reduce((s, p) => s + p.promptCount, 0) +
    AUTHORITY.reduce((s, a) => s + (a.promptCount ?? 0), 0);
  const totalPages =
    GUIDES.reduce((s, g) => s + g.pageCount, 0) +
    AUTHORITY.reduce((s, a) => s + (a.pageCount ?? 0), 0);
  const totalTemplates =
    GUIDES.reduce((s, g) => s + g.templateCount, 0) +
    AUTHORITY.reduce((s, a) => s + (a.templateCount ?? 0), 0);
  return (
    <main id="main" className="page is-active" data-page="bundles-index">
      <JsonLd
        data={itemListSchema({
          name: 'Promptos Bundles',
          items: BUNDLES.map((b) => ({
            name: b.name,
            url: `${SITE_URL}/bundles/${b.slug}`,
            description: b.tagline,
          })),
        })}
      />
      <section className="catalog-hero">
        <SectionFade as="div" className="catalog-hero-inner">
          <span className="label section-eyebrow">Bundles</span>
          <h1>Four bundles. Pick your scope.</h1>
          <p>
            Buy a single product if you're certain. Buy a bundle when you want the toolkit,
            the audience system, or the playbook on the same desktop. Save up to ${MEGA_BUNDLE.savings} vs. buying every product separately.
          </p>
        </SectionFade>
      </section>

      <BundleSelector heading="Compare the four bundles." />

      <CompareBundlesTable />

      <section className="catalog-body" style={{paddingTop: 0}}>
        <div className="catalog-body-inner" style={{maxWidth: 760, textAlign: 'center'}}>
          <SectionFade as="div">
            <div className="section-eyebrow">By the numbers</div>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.4vw, 56px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '12px 0'}}>
              <AnimatedCounter to={totalPrompts} /> prompts ·{' '}
              <AnimatedCounter to={totalPages} /> pages ·{' '}
              <AnimatedCounter to={totalTemplates} /> templates.
            </h2>
            <p style={{color: 'var(--fg-3)', fontSize: 17, marginTop: 12}}>
              Across {CATALOG_STATS.totalProductsPublicClaim} products. One purchase. Lifetime updates on every one.
            </p>
          </SectionFade>
        </div>
      </section>
    </main>
  );
}
