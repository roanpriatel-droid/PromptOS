import {Link} from 'react-router';
import {getPairWithSuggestions, type AnyProduct} from '~/lib/catalog';
import {PackCover} from './PackCover';
import {GuideCover} from './GuideCover';
import {SectionFade} from './SectionFade';

/**
 * "Pair with…" cross-sell strip used on pack + guide pages.
 * Shows 2 cross-sell suggestions + 1 mega-bundle nudge.
 */
type Props = {
  slug: string;
  heading?: string;
};

export function PairWith({slug, heading = 'Pair with these.'}: Props) {
  const suggestions = getPairWithSuggestions(slug).slice(0, 2);
  return (
    <section className="pair-with">
      <div className="pair-with-inner">
        <SectionFade as="div" className="pair-with-head">
          <div className="section-eyebrow">Cross-sell</div>
          <h2>{heading}</h2>
          <p>Operators who buy this usually pair it with one of these.</p>
        </SectionFade>
        <div className="pair-with-grid">
          {suggestions.map((p) => (
            <SectionFade key={p.slug} as="div">
              <PairCard product={p} />
            </SectionFade>
          ))}
          <SectionFade as="div" delayMs={120}>
            <MegaUpsellCard />
          </SectionFade>
        </div>
      </div>
    </section>
  );
}

function PairCard({product}: {product: AnyProduct}) {
  const linkTo =
    product.type === 'pack'
      ? `/packs/${product.slug}`
      : product.type === 'guide'
        ? `/guides/${product.slug}`
        : `/bundles/${product.slug}`;
  return (
    <Link to={linkTo} prefetch="intent" className="guide-card">
      <div className="cover">
        {product.type === 'pack' && <PackCover pack={product} />}
        {product.type === 'guide' && <GuideCover guide={product} />}
        {product.type === 'bundle' && (
          <div style={{background: 'var(--ink-deep)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--paper)', fontFamily: 'var(--font-serif)', fontSize: 36}}>
            {product.name}
          </div>
        )}
      </div>
      <div className="meta">
        <div className="vol">
          {product.type === 'pack' ? `Pack · ${product.role}` : product.type === 'guide' ? `Playbook · ${product.role}` : 'Bundle'}
        </div>
        <div className="name">{product.name}</div>
        <p className="promise">{product.tagline}</p>
        <div className="footer-row">
          <span className="price">${product.priceUSD}</span>
          <span className="view">View →</span>
        </div>
      </div>
    </Link>
  );
}

function MegaUpsellCard() {
  return (
    <Link to="/bundles/everything" prefetch="intent" className="guide-card" style={{background: 'var(--ink-deep)', borderColor: 'transparent'}}>
      <div className="cover" style={{background: 'var(--ink-deep)', position: 'relative'}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(40% 40% at 30% 30%, rgba(107,70,193,0.55), transparent 60%), radial-gradient(40% 40% at 70% 70%, rgba(236,72,153,0.50), transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--paper)',
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(40px, 8vw, 64px)',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            textAlign: 'center',
            padding: '0 20px',
          }}
        >
          All 17.<br/><em style={{color: '#EC4899'}}>One price.</em>
        </div>
      </div>
      <div className="meta" style={{background: 'var(--ink-deep)', color: 'var(--paper)'}}>
        <div className="vol" style={{color: '#EC4899'}}>The mega bundle</div>
        <div className="name" style={{color: 'var(--paper)'}}>Everything, $798</div>
        <p className="promise" style={{color: 'rgba(255,255,255,0.7)'}}>
          All 20 products: 7 packs, 8 playbooks, 3 Authority products. Save $914 vs. buying separately.
        </p>
        <div className="footer-row" style={{borderTopColor: 'rgba(255,255,255,0.12)'}}>
          <span className="price" style={{color: 'var(--paper)'}}>$798</span>
          <span className="view" style={{color: '#EC4899', opacity: 1, transform: 'none'}}>See the bundle →</span>
        </div>
      </div>
    </Link>
  );
}
