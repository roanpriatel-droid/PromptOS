/**
 * v3.8a Phase 4D — 3-bullet "Why this actually works" section.
 * Sits below "What's inside" and above reviews on every product page.
 * Brand-consistent voice. Same copy regardless of product.
 */
export function WhyThisWorks() {
  return (
    <section className="why-this-works" style={{padding: '96px 0', background: 'var(--paper, #FAFAFA)'}}>
      <div style={{maxWidth: 880, margin: '0 auto', padding: '0 var(--space-5, 24px)'}}>
        <div className="section-eyebrow">Why this actually works</div>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(34px, 4.4vw, 52px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            margin: '6px 0 40px',
            color: 'var(--ink, #0F0A1F)',
          }}
        >
          Three reasons it lands.
        </h2>
        <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 28}}>
          <li>
            <h3
              style={{
                margin: '0 0 6px',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--ink, #0F0A1F)',
              }}
            >
              Battle-tested.
            </h3>
            <p style={{margin: 0, color: 'var(--ink-soft, #6B6478)', lineHeight: 1.6, fontSize: 17}}>
              Every prompt was used in real campaigns, client projects, or
              money-on-the-line situations before it made the cut.
            </p>
          </li>
          <li>
            <h3
              style={{
                margin: '0 0 6px',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--ink, #0F0A1F)',
              }}
            >
              Specific, not generic.
            </h3>
            <p style={{margin: 0, color: 'var(--ink-soft, #6B6478)', lineHeight: 1.6, fontSize: 17}}>
              Each prompt solves one exact problem. Not &ldquo;be more
              productive.&rdquo; Not &ldquo;improve your marketing.&rdquo;
              Specific job, specific output.
            </p>
          </li>
          <li>
            <h3
              style={{
                margin: '0 0 6px',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--ink, #0F0A1F)',
              }}
            >
              Built to outlast model upgrades.
            </h3>
            <p style={{margin: 0, color: 'var(--ink-soft, #6B6478)', lineHeight: 1.6, fontSize: 17}}>
              Works on Claude, ChatGPT, Gemini, Grok. The prompts are built
              around clear thinking, not model-specific tricks.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
