import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {PACKS, GUIDES} from '~/lib/catalog';
import {CATALOG_STATS} from '~/lib/catalog-stats';
import {PackCover} from './PackCover';
import {GuideCover} from './GuideCover';
import {HeroMesh} from '~/components/atmosphere/HeroMesh';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

const ROTOR_WORDS = ['work', 'sell', 'ship', 'scale', 'convert', 'land'];
const ROTOR_INTERVAL = 2200;

/**
 * Homepage hero v2 — typewriter rotor + a stage of seven floating covers,
 * mixing pack covers (4) and guide covers (3). One cover spotlights at a
 * time on a 4-second cadence.
 */
const STAGE = [
  {type: 'guide', idx: 0},  // ai-automation-agency
  {type: 'pack', idx: 0},   // marketer
  {type: 'guide', idx: 3},  // digital-products
  {type: 'pack', idx: 4},   // content-creator
  {type: 'guide', idx: 7},  // coaching-consulting
  {type: 'pack', idx: 5},   // ai-power-user
  {type: 'pack', idx: 6},   // productivity
] as const;

export function HeroV2() {
  const [word, setWord] = useState(0);
  const [spotlight, setSpotlight] = useState(0);
  // v3.9d-perf Fix 3: gate the two setIntervals on whether the hero
  // is currently visible. Before this, both timers fired forever —
  // triggering React state updates + re-renders of the 7 floats —
  // even when the hero had scrolled an entire page out of view.
  // We piggyback on the existing data-perf-pause="hero-mesh" attribute
  // that HeroMesh already emits (so we don't need a separate ref
  // wired through the component).
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    const node = document.querySelector('[data-perf-pause="hero-mesh"]');
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setIsVisible(e.isIntersecting);
      },
      {rootMargin: '128px 0px'},
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => setWord((w) => (w + 1) % ROTOR_WORDS.length), ROTOR_INTERVAL);
    return () => clearInterval(t);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => setSpotlight((s) => (s + 1) % STAGE.length), 4000);
    return () => clearInterval(t);
  }, [isVisible]);

  return (
    <HeroMesh as="section" className="hero-v2">
      <div className="hero-v2-bg" aria-hidden />
      <NoiseTexture />
      <div className="hero-v2-inner">
        <div className="hero-v2-grid">
          <div className="hero-v2-text">
            <div className="hero-v2-eyebrow">
              <span className="dot" aria-hidden />
              {CATALOG_STATS.totalProductsPublicClaim} products · {CATALOG_STATS.totalPrompts} prompts · {CATALOG_STATS.totalPlaybooks} playbooks · {CATALOG_STATS.totalAuthority} Authority products
            </div>
            <h1 className="hero-v2-headline">
              Prompts &amp; playbooks that <span className="rotor">{ROTOR_WORDS[word]}</span>.
            </h1>
            <p className="hero-v2-sub">
              Two product lines, one quality bar. Prompt packs for the work you do every day ,
              playbooks for the business you want to build. Battle-tested, written for specific
              jobs, designed for operators.
            </p>
            <div className="hero-v2-actions">
              <Link
                to="/packs"
                prefetch="intent"
                className="btn btn-large btn-gradient btn-arrow"
              >
                Shop packs
              </Link>
              <Link
                to="/guides"
                prefetch="intent"
                className="btn btn-large btn-secondary btn-arrow"
              >
                Browse guides
              </Link>
            </div>
          </div>

          <div className="hero-v2-stage" aria-hidden>
            {STAGE.map((entry, i) => (
              <div
                key={`${entry.type}-${entry.idx}`}
                className={`float f${i + 1}${spotlight === i ? ' spotlight' : ''}`}
              >
                {entry.type === 'pack' ? (
                  <PackCover pack={PACKS[entry.idx]} />
                ) : (
                  <GuideCover guide={GUIDES[entry.idx]} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </HeroMesh>
  );
}
