import {SectionFade} from './SectionFade';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

/**
 * v3.9b Section 3 — "What's inside" UPGRADE.
 *
 * Surfaces the per-section detail that's already in the catalog data
 * but never shown on the product page before:
 *   - section name (e.g. "Content Writing")
 *   - count (e.g. 12 prompts / 16 pages)
 *   - description (the one-sentence outcome)
 *   - sample titles (3 actual prompt names per section)
 *
 * Buyers want to verify volume + specificity. This component does
 * exactly that and nothing more — no purchase logic, no atmosphere
 * other than the wrapping section.
 */

export type WhatsInsideSection = {
  name: string;
  count: string;          // e.g. "12 prompts" or "14 pages"
  description: string;    // the one-sentence outcome
  /** 3 (or more) sample titles. We render up to 5 with a "+N more" tail. */
  sampleTitles: string[];
};

type Props = {
  kind: 'pack' | 'guide' | 'authority';
  sections: WhatsInsideSection[];
  /** Optional total count for the footer line. */
  totalLine?: string;
  /** Eyebrow line. Defaults to "What's inside". */
  eyebrow?: string;
};

export function WhatsInsideUpgraded({kind, sections, totalLine, eyebrow = "What's inside"}: Props) {
  const headline = kind === 'guide' ? 'Every chapter, by the page.' : 'Every section, by the prompt.';
  return (
    <section className="v39a-section" style={{padding: '96px 0', background: 'var(--bone, #FAF8F5)'}}>
      <GradientOrb color="purple" intensity="soft" size={420} top="30%" right="-4%" />
      <NoiseTexture />

      <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
        <SectionFade as="div" style={{maxWidth: 680, marginBottom: 48}}>
          <div className="section-eyebrow">{eyebrow}</div>
          <h2 style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(32px, 4.4vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '8px 0 12px'}}>
            {headline}
          </h2>
          <p style={{fontSize: 16, lineHeight: 1.55, color: 'var(--fg-3, rgba(31,18,64,0.65))', maxWidth: 520}}>
            What you're paying for, in detail. No fluff sections.
          </p>
        </SectionFade>

        <div style={{display: 'grid', gap: 12}}>
          {sections.map((s, i) => {
            const shown = s.sampleTitles.slice(0, 5);
            const remaining = Math.max(0, s.sampleTitles.length - shown.length);
            return (
              <SectionFade key={s.name} as="article" delayMs={i * 50}>
                <div className="v39a-hover-lift" style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(160px, 200px) 1fr',
                  gap: 24,
                  padding: 28,
                  background: '#FFFFFF',
                  border: '1px solid rgba(31,18,64,0.08)',
                  borderRadius: 16,
                }}>
                  {/* Left: section name + count */}
                  <div>
                    <div style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: 11, fontWeight: 700, letterSpacing: '2.4px',
                      color: '#6B46C1', marginBottom: 6,
                    }}>
                      SECTION {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontStyle: 'italic', margin: 0, lineHeight: 1.1, color: 'var(--ink, #1F1240)'}}>
                      {s.name}
                    </h3>
                    <div style={{marginTop: 8, fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 12, color: '#EC4899', fontWeight: 600}}>
                      {s.count}
                    </div>
                  </div>

                  {/* Right: description + sample titles */}
                  <div>
                    <p style={{fontSize: 15, lineHeight: 1.55, color: 'var(--ink, #1F1240)', margin: '4px 0 14px'}}>
                      {s.description}
                    </p>
                    <div style={{display: 'flex', flexWrap: 'wrap' as const, gap: 8, alignItems: 'center'}}>
                      <span style={{fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: 'rgba(31,18,64,0.45)'}}>
                        INCLUDES:
                      </span>
                      {shown.map((t, j) => (
                        <span key={t} style={{
                          fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13, fontWeight: 500,
                          color: 'var(--ink, #1F1240)',
                          padding: '4px 10px', borderRadius: 999,
                          background: 'rgba(107,70,193,0.08)',
                          border: '1px solid rgba(107,70,193,0.15)',
                        }}>
                          {t}
                          {j < shown.length - 1 ? null : null}
                        </span>
                      ))}
                      {remaining > 0 ? (
                        <span style={{
                          fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13, fontWeight: 700,
                          color: '#EC4899',
                          padding: '4px 10px', borderRadius: 999,
                          background: 'rgba(236,72,153,0.08)',
                          border: '1px solid rgba(236,72,153,0.15)',
                        }}>
                          + {remaining} more
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </SectionFade>
            );
          })}
        </div>

        {totalLine ? (
          <p style={{marginTop: 28, fontSize: 14, color: 'var(--fg-3, rgba(31,18,64,0.55))', fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center'}}>
            {totalLine}
          </p>
        ) : null}
      </div>
    </section>
  );
}
