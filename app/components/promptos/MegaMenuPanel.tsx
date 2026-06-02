import {Link} from 'react-router';
import type {ReactNode} from 'react';
import {AUTHORITY, GUIDES, PACKS, BUNDLES} from '~/lib/catalog';
import {CATALOG_STATS} from '~/lib/catalog-stats';

/**
 * The Header's four dropdowns all use this panel. Each variant is a
 * presentation of catalog data — no data lives here.
 */

type MegaProps = {
  open: boolean;
  variant: 'packs' | 'authority' | 'guides' | 'bundles';
};

export function MegaMenuPanel({open, variant}: MegaProps) {
  return (
    <div className={`mega-menu mega-${variant}${open ? ' is-open' : ''}`}>
      {variant === 'packs' && <PacksLayout />}
      {variant === 'authority' && <AuthorityLayout />}
      {variant === 'guides' && <GuidesLayout />}
      {variant === 'bundles' && <BundlesLayout />}
    </div>
  );
}

function PacksLayout() {
  return (
    <div className="mega-grid mega-grid-2">
      <Column label="By profession">
        <ul className="mega-pack-list">
          {PACKS.map((p) => (
            <li key={p.slug}>
              <Link to={`/packs/${p.slug}`} prefetch="intent" className="mega-pack-link">
                <div>
                  <span className="name">{p.name}</span>
                  <span className="aud">{p.audience}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Column>

      <Column label="Or get everything">
        <PacksBundleCard />
      </Column>
    </div>
  );
}

function AuthorityLayout() {
  return (
    <div className="mega-grid mega-grid-2">
      <Column label="The products">
        <ul className="mega-pack-list">
          {AUTHORITY.map((a) => (
            <li key={a.slug}>
              <Link to={`/authority/${a.slug}`} prefetch="intent" className="mega-pack-link">
                <div>
                  <span className="name">{a.name}</span>
                  <span className="aud">{a.audience}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Column>

      <Column label="Or get all three">
        <AuthorityBundleCard />
      </Column>
    </div>
  );
}

function GuidesLayout() {
  // Split 8 guides into 3 columns: agency / solo / premium-mixed-plus-card
  const agency = GUIDES.filter((g) => g.category === 'agency');
  const solo = GUIDES.filter((g) => g.category === 'solo');
  const premium = GUIDES.filter((g) => g.category === 'premium');
  return (
    <div className="mega-grid mega-grid-3">
      <Column label="Agency models">
        <ul className="mega-pack-list">
          {premium.slice(0, 1).map((g) => (
            <li key={g.slug}>
              <Link to={`/guides/${g.slug}`} prefetch="intent" className="mega-pack-link">
                <div>
                  <span className="name">{g.name}</span>
                  <span className="aud">{g.audience}</span>
                </div>
              </Link>
            </li>
          ))}
          {agency.map((g) => (
            <li key={g.slug}>
              <Link to={`/guides/${g.slug}`} prefetch="intent" className="mega-pack-link">
                <div>
                  <span className="name">{g.name}</span>
                  <span className="aud">{g.audience}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Column>

      <Column label="Solo models">
        <ul className="mega-pack-list">
          {solo.slice(0, 3).map((g) => (
            <li key={g.slug}>
              <Link to={`/guides/${g.slug}`} prefetch="intent" className="mega-pack-link">
                <div>
                  <span className="name">{g.name}</span>
                  <span className="aud">{g.audience}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Column>

      <Column label="Premium models">
        <ul className="mega-pack-list" style={{marginBottom: 16}}>
          {premium.slice(1).map((g) => (
            <li key={g.slug}>
              <Link to={`/guides/${g.slug}`} prefetch="intent" className="mega-pack-link">
                <div>
                  <span className="name">{g.name}</span>
                  <span className="aud">{g.audience}</span>
                </div>
              </Link>
            </li>
          ))}
          {solo.slice(3).map((g) => (
            <li key={g.slug}>
              <Link to={`/guides/${g.slug}`} prefetch="intent" className="mega-pack-link">
                <div>
                  <span className="name">{g.name}</span>
                  <span className="aud">{g.audience}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <GuidesBundleCard />
      </Column>
    </div>
  );
}

function BundlesLayout() {
  return (
    <div className="mega-grid mega-grid-4 mega-bundles-row">
      {BUNDLES.map((b) => (
        <BundleMegaCard key={b.slug} bundle={b} />
      ))}
    </div>
  );
}

function Column({label, children}: {label: string; children: ReactNode}) {
  return (
    <div>
      <div className="mega-label">{label}</div>
      {children}
    </div>
  );
}

function PacksBundleCard() {
  const b = BUNDLES[0]; // packs
  return (
    <div className="mega-bundle-card">
      <div className="stack">
        {PACKS.map((p, i) => (
          <div
            key={p.slug}
            className="card"
            style={{
              left: `${i * 18}px`,
              background: p.color,
              transform: `rotate(${(i - 3) * 3}deg)`,
              zIndex: 7 - i,
            }}
          />
        ))}
      </div>
      <h4>{b.name}</h4>
      <p className="desc">All {CATALOG_STATS.totalPacks} packs · {CATALOG_STATS.promptsFromPacks} prompts · save ${b.savings}</p>
      <div className="price-row">
        <span className="now">${b.priceUSD}</span>
        <span className="save">save ${b.savings}</span>
      </div>
      <Link to={`/bundles/${b.slug}`} prefetch="intent" className="cta">
        Get the bundle <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function AuthorityBundleCard() {
  const b = BUNDLES[1]; // authority
  return (
    <div className="mega-bundle-card">
      <div className="stack">
        {AUTHORITY.map((a, i) => (
          <div
            key={a.slug}
            className="card"
            style={{
              left: `${i * 22}px`,
              background: a.color,
              transform: `rotate(${(i - 1) * 5}deg)`,
              zIndex: 3 - i,
            }}
          />
        ))}
      </div>
      <h4>{b.name}</h4>
      <p className="desc">All 3 Authority products · save ${b.savings}</p>
      <div className="price-row">
        <span className="now">${b.priceUSD}</span>
        <span className="save">save ${b.savings}</span>
      </div>
      <Link to={`/bundles/${b.slug}`} prefetch="intent" className="cta">
        Get the bundle <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function GuidesBundleCard() {
  const b = BUNDLES[2]; // guides
  return (
    <div className="mega-bundle-card mega-bundle-card-dark">
      <div className="stack">
        {GUIDES.map((g, i) => (
          <div
            key={g.slug}
            className="card"
            style={{
              left: `${i * 18}px`,
              background: g.color,
              transform: `rotate(${(i - 3) * 3}deg)`,
              zIndex: 8 - i,
            }}
          />
        ))}
      </div>
      <h4 style={{color: '#FAFAFA'}}>{b.name}</h4>
      <p className="desc" style={{color: 'rgba(255,255,255,0.7)'}}>
        All 8 guides · 600+ pages · save ${b.savings}
      </p>
      <div className="price-row">
        <span className="now" style={{color: '#FAFAFA'}}>${b.priceUSD}</span>
        <span className="save">save ${b.savings}</span>
      </div>
      <Link to={`/bundles/${b.slug}`} prefetch="intent" className="cta">
        Get the bundle <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function BundleMegaCard({bundle}: {bundle: typeof BUNDLES[number]}) {
  const isEverything = bundle.slug === 'everything';
  // Pick the visual stack: own products if not Everything, otherwise mix
  let visual: Array<{slug: string; color: string}> = [];
  if (bundle.slug === 'packs') visual = PACKS;
  else if (bundle.slug === 'authority') visual = AUTHORITY;
  else if (bundle.slug === 'guides') visual = GUIDES;
  else visual = [...PACKS, ...GUIDES, ...AUTHORITY];
  return (
    <Link
      to={`/bundles/${bundle.slug}`}
      prefetch="intent"
      className={`mega-bundle-card${isEverything ? ' mega-bundle-card-dark' : ''}`}
      style={{cursor: 'pointer'}}
    >
      <div className="stack">
        {visual.map((p, i) => (
          <div
            key={p.slug}
            className="card"
            style={{
              left: `${i * 10}px`,
              background: p.color,
              transform: `rotate(${(i - 5) * 2}deg)`,
              zIndex: 20 - i,
            }}
          />
        ))}
      </div>
      <h4 style={isEverything ? {color: '#FAFAFA'} : undefined}>{bundle.name}</h4>
      <p className="desc" style={isEverything ? {color: 'rgba(255,255,255,0.7)'} : undefined}>
        {bundle.tagline}
      </p>
      <div className="price-row">
        <span className="now" style={isEverything ? {color: '#FAFAFA'} : undefined}>
          ${bundle.priceUSD}
        </span>
        <span className="save">save ${bundle.savings}</span>
      </div>
      <span className="cta">
        See the bundle <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
