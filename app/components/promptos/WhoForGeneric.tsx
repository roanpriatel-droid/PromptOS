import {SectionFade} from './SectionFade';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

/**
 * v3.9b — generalized "Who this is for" component.
 *
 * The existing WhoForV2 is pack-specific; this version accepts the same
 * `whoFor` line list from any product type (Pack, Guide, Authority) and
 * renders the v3.9 atmospheric treatment alongside it. Keep WhoForV2
 * untouched for backwards compatibility on existing callers.
 */
type Props = {
  /** Eyebrow line above the heading. */
  eyebrow?: string;
  /** Section heading. Pass the full sentence; this is not templated. */
  heading: string;
  /** The "Who this is for" lines. */
  whoFor: string[];
};

export function WhoForGeneric({eyebrow = 'Who this is for', heading, whoFor}: Props) {
  return (
    <section className="v39a-section" style={{padding: '88px 0', background: 'var(--ink-deep, #0F0A1F)', color: '#FAF8F5'}}>
      <GradientOrb color="purple" intensity="soft" size={460} top="20%" left="-4%" />
      <NoiseTexture />
      <div style={{maxWidth: 960, margin: '0 auto', padding: '0 var(--space-5)'}}>
        <SectionFade as="div" style={{maxWidth: 640, marginBottom: 32}}>
          <div className="section-eyebrow" style={{color: '#9264E5'}}>{eyebrow}</div>
          <h2 style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '8px 0 12px', color: '#FAF8F5'}}>
            {heading}
          </h2>
        </SectionFade>
        <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12}}>
          {whoFor.map((line, i) => (
            <SectionFade key={line} as="li" delayMs={i * 60}>
              <div className="v39a-hover-lift" style={{
                display: 'flex' as const,
                alignItems: 'flex-start' as const,
                gap: 14,
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.04)',
                borderLeft: '3px solid #EC4899',
                borderRadius: '0 12px 12px 0',
              }}>
                <span aria-hidden style={{
                  flexShrink: 0,
                  width: 24, height: 24, borderRadius: 999,
                  background: 'linear-gradient(135deg, #9264E5, #EC4899)',
                  display: 'grid', placeItems: 'center',
                  fontSize: 12, fontWeight: 700, color: '#FAF8F5',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}>
                  {i + 1}
                </span>
                <p style={{
                  margin: 0,
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 19, lineHeight: 1.5,
                  color: 'rgba(250,248,245,0.92)',
                }}>
                  {line}
                </p>
              </div>
            </SectionFade>
          ))}
        </ul>
      </div>
    </section>
  );
}
