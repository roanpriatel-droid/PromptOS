import {SectionFade} from './SectionFade';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

/**
 * v3.9b Section 2 — "What you actually get" value stack.
 *
 * A grid of cards laying out every concrete thing included with the
 * product. Card content is driven by `kind` so packs / playbooks /
 * Authority products each get the right card set. Callers can override
 * any card by passing a custom items array.
 */

export type ValueStackItem = {
  /** Short, single-line headline. */
  title: string;
  /** 1-2 line subtext. Empty string ok. */
  body: string;
  /** Simple SVG glyph keyword — kept tiny / brand-aligned. */
  glyph: 'file' | 'list' | 'output' | 'tip' | 'brackets' | 'box' | 'guide' | 'roadmap' | 'template' | 'check' | 'people' | 'mail' | 'updates' | 'notion';
};

type Props = {
  kind: 'pack' | 'guide' | 'authority';
  /** Optional override for the default item set. */
  items?: ValueStackItem[];
  /** Product name for the section eyebrow. */
  productName?: string;
};

const DEFAULTS_PACK: ValueStackItem[] = [
  {glyph: 'file', title: '55–75 prompts', body: 'Editable .docx + polished PDF mirror, shipped to your inbox at checkout.'},
  {glyph: 'brackets', title: 'Bracketed variables', body: 'Every prompt has [TAGS] you swap for your specifics. No guesswork.'},
  {glyph: 'output', title: 'Example output per prompt', body: "We show you what Claude (or GPT, or Gemini) returns. So you know what 'good' looks like before you customize."},
  {glyph: 'tip', title: 'One pro tip per prompt', body: "The thing the prompt won't tell you — the gotcha, the nuance, the move that doubles output quality."},
  {glyph: 'list', title: 'Use case + customization', body: 'Each prompt has a use case ("when to reach for this") and a customization note ("when to bend it").'},
  {glyph: 'people', title: 'Section-organized', body: 'Six sections, each scoped to one kind of work. Find the prompt you need in seconds.'},
  {glyph: 'updates', title: 'Lifetime updates', body: 'New prompts added quarterly. Every future version free, forever.'},
];

const DEFAULTS_GUIDE: ValueStackItem[] = [
  {glyph: 'guide', title: '90–180 pages of operator content', body: 'Real frameworks, real numbers, real positioning. Not motivational fluff.'},
  {glyph: 'template', title: '8–14 included templates', body: '.docx + PDF — proposals, scripts, contracts, calculators, decks.'},
  {glyph: 'check', title: 'Real scripts, real contracts', body: 'Lawyer-reviewed, plain-English. The kind of paperwork you can actually use.'},
  {glyph: 'roadmap', title: '90-day execution roadmap', body: 'Day 1 to first client, in order. No more "what do I do next?"'},
  {glyph: 'people', title: 'Written by an operator', body: 'By someone who actually ran the business, then reviewed by two more operators currently running it.'},
  {glyph: 'mail', title: 'Email + cold outreach swipes', body: 'The exact subject lines, opens, and follow-ups that book discovery calls.'},
  {glyph: 'updates', title: 'Lifetime updates', body: 'New editions free, forever. Every playbook improves with the buyers in it.'},
];

const DEFAULTS_AUTHORITY: ValueStackItem[] = [
  {glyph: 'guide', title: '55–85 pages of strategy', body: 'Positioning, audience system, daily content frameworks — the strategy, the execution, the moat.'},
  {glyph: 'file', title: 'Prompts where appropriate', body: 'When the work needs to ship daily, you get prompts. When it needs structure, you get pages.'},
  {glyph: 'template', title: 'Worksheets + audits', body: 'Real worksheets you fill out — not "reflection journals," actual decision-making tools.'},
  {glyph: 'check', title: 'Sequenced for compounding', body: 'Authority products are designed to pair: strategy → execution → monetization. Buy one or all three.'},
  {glyph: 'people', title: 'Written by operators', body: 'Same standard as the playbooks: built by people who did the thing, reviewed by people doing it now.'},
  {glyph: 'updates', title: 'Lifetime updates', body: 'New editions free, forever.'},
];

export function ValueStack({kind, items, productName}: Props) {
  const cards = items ?? (kind === 'pack' ? DEFAULTS_PACK : kind === 'guide' ? DEFAULTS_GUIDE : DEFAULTS_AUTHORITY);
  return (
    <section className="v39a-section" style={{padding: '96px 0', background: 'linear-gradient(180deg, var(--ink-deep, #0F0A1F) 0%, #150A2A 100%)', color: '#FAF8F5'}}>
      <GradientOrb color="purple" intensity="soft" size={520} top="10%" left="-6%" />
      <GradientOrb color="pink" intensity="soft" size={460} bottom="10%" right="-4%" />
      <NoiseTexture />

      <div style={{maxWidth: 1180, margin: '0 auto', padding: '0 var(--space-5)'}}>
        <SectionFade as="div" style={{maxWidth: 720, marginBottom: 56}}>
          <div className="section-eyebrow" style={{color: '#EC4899'}}>What you actually get</div>
          <h2 style={{fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)', fontSize: 'clamp(36px, 4.4vw, 56px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '8px 0 16px', color: '#FAF8F5'}}>
            {productName ? `Inside ${productName}.` : 'Inside the product.'}
          </h2>
          <p style={{fontSize: 17, lineHeight: 1.55, color: 'rgba(250,248,245,0.75)', maxWidth: 560}}>
            Every concrete asset that lands in your inbox at checkout. No surprises, no upsells.
          </p>
        </SectionFade>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {cards.map((it, i) => (
            <SectionFade key={it.title} as="div" delayMs={i * 60}>
              <article className="v39a-hover-lift" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1.5px solid rgba(255,255,255,0.08)',
                borderRadius: 18,
                padding: 24,
                height: '100%',
                display: 'flex',
                flexDirection: 'column' as const,
                gap: 12,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(146,100,229,0.30), rgba(236,72,153,0.20))',
                  display: 'grid', placeItems: 'center', color: '#FAF8F5',
                }} aria-hidden>
                  <Glyph kind={it.glyph} />
                </div>
                <h3 style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontStyle: 'italic', fontWeight: 600, margin: 0, color: '#FAF8F5'}}>{it.title}</h3>
                {it.body ? (
                  <p style={{fontSize: 14, lineHeight: 1.55, color: 'rgba(250,248,245,0.70)', margin: 0}}>{it.body}</p>
                ) : null}
              </article>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function Glyph({kind}: {kind: ValueStackItem['glyph']}) {
  // Simple stroke-glyphs sized to 22×22 inside the 44×44 badge.
  const s = 22;
  const stroke = '#FAF8F5';
  const sw = 1.7;
  switch (kind) {
    case 'file':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>
          <path d="M14 3v5h5"/>
        </svg>
      );
    case 'list':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" aria-hidden><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill={stroke}/><circle cx="4" cy="12" r="1.2" fill={stroke}/><circle cx="4" cy="18" r="1.2" fill={stroke}/></svg>
      );
    case 'output':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4l-5 1 1.2-4.5A8.4 8.4 0 1 1 21 11.5z"/></svg>
      );
    case 'tip':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 2v2"/><path d="M5 5l1.4 1.4"/><path d="M2 12h2"/><path d="M5 19l1.4-1.4"/><path d="M12 22v-2"/><circle cx="12" cy="12" r="5"/></svg>
      );
    case 'brackets':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 4H4v16h5"/><path d="M15 4h5v16h-5"/></svg>
      );
    case 'box':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/></svg>
      );
    case 'guide':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h4"/></svg>
      );
    case 'roadmap':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" aria-hidden><circle cx="5" cy="6" r="1.6" fill={stroke}/><circle cx="12" cy="12" r="1.6" fill={stroke}/><circle cx="19" cy="18" r="1.6" fill={stroke}/><line x1="6" y1="7" x2="11" y2="11"/><line x1="13" y1="13" x2="18" y2="17"/></svg>
      );
    case 'template':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>
      );
    case 'check':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg>
      );
    case 'people':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M14 20a4 4 0 0 1 7 0"/></svg>
      );
    case 'mail':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>
      );
    case 'updates':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>
      );
    case 'notion':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7v10"/><path d="M8 7l8 10"/><path d="M16 7v10"/></svg>
      );
  }
}
