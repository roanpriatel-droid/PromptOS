import {Link} from 'react-router';
import {PACKS, PACKS_BUNDLE} from '~/lib/catalog';
import {getReviewStats} from '~/lib/reviews';
import {PackCover} from './PackCover';
import {BundleCover} from './BundleCover';
import {SectionFade} from './SectionFade';
import {RatingStars} from './RatingStars';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

/**
 * Pack grid v2 — clean 4+3 grid of seven pack cards, followed by a
 * full-width feature card for the Packs Bundle. The bundle was previously
 * crammed inside the grid; now it lives in its own section so the cards
 * stay uniform and the bundle gets the visual weight it deserves.
 */
export function PackGridV2() {
  return (
    <section className="packs-v2 v39a-section" id="packs">
      {/* v3.9b D4 — packs grid leans purple-dominant */}
      <GradientOrb color="purple" intensity="soft" size={560} top="15%" right="-8%" />
      <GradientOrb color="purple" intensity="soft" size={420} bottom="20%" left="-6%" />
      <NoiseTexture />
      <SectionFade as="div" className="packs-v2-head">
        <div className="section-eyebrow">The packs</div>
        <h2>Built for the work you actually do.</h2>
        <p>Pick the pack that matches your job. Or take all seven in the Packs Bundle.</p>
      </SectionFade>

      <div className="packs-v2-grid packs-v2-grid-7">
        {PACKS.map((p, i) => (
          <SectionFade key={p.slug} as="div" delayMs={i * 60}>
            <PackCardV2 pack={p} />
          </SectionFade>
        ))}
      </div>

      <SectionFade as="div">
        <BundleFeatureRow />
      </SectionFade>
    </section>
  );
}

function PackCardV2({pack}: {pack: typeof PACKS[number]}) {
  const stats = getReviewStats(pack.id);
  // 3 strongest section highlights to fill the body of the card.
  const highlights = pack.sections.slice(0, 3).map(
    (s) => `${s.promptCount} ${s.name.toLowerCase()} prompts`,
  );
  return (
    <Link
      to={`/packs/${pack.slug}`}
      prefetch="intent"
      className="v2-card v2-card-clickable v39a-hover-lift"
      data-tone={pack.tone}
      aria-label={`${pack.name}, ${stats.count} reviews, $${pack.priceUSD}`}
    >
      <div className="cover">
        <PackCover pack={pack} />
      </div>
      <div className="meta">
        <div className="name">{pack.name}</div>
        <div className="aud">{pack.role}</div>
        <ul className="card-highlights">
          {highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <hr className="card-pink-divider" aria-hidden />
        <p className="card-best-for">
          <span className="card-best-for-label">Best for:</span>{pack.audience}
        </p>
        <div className="card-rating">
          <RatingStars rating={stats.average} />
          <span className="card-rating-text">
            <strong>{stats.average.toFixed(1)}</strong>
            <span className="card-rating-count">·  {stats.count} reviews</span>
          </span>
        </div>
        <div className="card-divider" aria-hidden />
        <div className="footer-row">
          <span>{pack.promptCount} prompts</span>
          <span className="price">${pack.priceUSD} USD</span>
        </div>
        <div className="card-persistent-cta" aria-hidden>
          View pack <span>→</span>
        </div>
      </div>
    </Link>
  );
}

function BundleFeatureRow() {
  return (
    <Link
      to={`/bundles/${PACKS_BUNDLE.slug}`}
      prefetch="intent"
      className="bundle-feature-row v39a-hover-lift v39a-hover-lift-strong"
      aria-label={`${PACKS_BUNDLE.name}, $${PACKS_BUNDLE.priceUSD}, save $${PACKS_BUNDLE.savings}`}
    >
      <div className="bundle-feature-mesh" aria-hidden />
      <div className="bundle-feature-grid">
        <div className="bundle-feature-cover">
          <BundleCover slug={PACKS_BUNDLE.slug} alt={PACKS_BUNDLE.name} />
        </div>
        <div className="bundle-feature-meta">
          <span className="badge">Best value</span>
          <h3>The Packs Bundle</h3>
          <p className="lede">
            All seven packs. {PACKS_BUNDLE.includesProductIds.length === PACKS.length ? '430 prompts' : ''}. One file you can edit, fork, and ship. Pay once. Updated forever.
          </p>
          <div className="bundle-feature-price">
            <span className="strike">${PACKS_BUNDLE.individualTotal}</span>
            <span className="arrow" aria-hidden>→</span>
            <span className="now">${PACKS_BUNDLE.priceUSD}</span>
            <span className="save">Save ${PACKS_BUNDLE.savings}</span>
          </div>
          <span className="bundle-feature-cta">
            Get the Packs Bundle <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
