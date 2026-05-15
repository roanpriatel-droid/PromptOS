import {SectionFade} from './SectionFade';

/**
 * Three-up "Why Promptos" section with custom inline SVG icons.
 * Cards lift on hover with a gradient border revealing.
 */
export function WhyPromptos() {
  return (
    <section className="why-section">
      <SectionFade as="div" className="how-head" delayMs={0}>
        <div style={{textAlign: 'center', maxWidth: 760, margin: '0 auto', padding: '0 var(--space-5)'}}>
          <div className="section-eyebrow">Why Promptos</div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 4.4vw, 56px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}>
            Built for the work you actually do.
          </h2>
        </div>
      </SectionFade>

      <div className="why-grid">
        <SectionFade className="why-card" delayMs={0}>
          <BeakerIcon />
          <h3>Battle-tested in real work.</h3>
          <p>
            Every prompt was used in actual campaigns, client projects, and
            money-on-the-line situations before it made the cut.
          </p>
        </SectionFade>
        <SectionFade className="why-card" delayMs={120}>
          <TargetIcon />
          <h3>Built for specific jobs.</h3>
          <p>
            Not vague &ldquo;help me write a blog post.&rdquo; Each prompt
            solves one exact problem with the structure to back it up.
          </p>
        </SectionFade>
        <SectionFade className="why-card" delayMs={240}>
          <LayersIcon />
          <h3>Works with every major AI.</h3>
          <p>
            Claude, ChatGPT, Gemini, Grok, these prompts don&apos;t depend on
            model tricks. They&apos;re built around better thinking.
          </p>
        </SectionFade>
      </div>
    </section>
  );
}

function BeakerIcon() {
  return (
    <svg className="why-icon" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M18 6h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 6v10L12 36a4 4 0 0 0 3.5 6h17A4 4 0 0 0 36 36L28 16V6"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14.5 28h19" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="34" r="1.5" fill="#EC4899" />
      <circle cx="27" cy="36" r="1" fill="#EC4899" />
      <circle cx="24" cy="32" r="0.8" fill="#EC4899" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="why-icon" viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="22" cy="26" r="14" stroke="currentColor" strokeWidth="2" />
      <circle cx="22" cy="26" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="22" cy="26" r="3" fill="#EC4899" />
      <path d="m28 20 14-14M36 6h6v6" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg className="why-icon" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M24 6 6 14l18 8 18-8-18-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m6 22 18 8 18-8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m6 30 18 8 18-8" stroke="#EC4899" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
