import {SectionFade} from './SectionFade';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

/**
 * v3.9b option-2 shells for product-page sections 6, 7, 8, 10.
 *
 * Each shell is fully wired (atmospheric pass, layout, hover states,
 * placeholder count consistent with the spec) but the actual editorial
 * content needs the user's voice. Strings marked CONTENT_NEEDED below
 * are grep-targets — search the codebase for "CONTENT_NEEDED" to find
 * everything outstanding before v3.9c.
 *
 * When the user supplies real copy in v3.9c, the shells can stay (just
 * swap the prop strings) — the component scaffolds are correct.
 */

// ============================================================
// Section 6 — "Who this is for" (per-product personas)
// ============================================================

export type WhoForPersona = {
  /** Single-line italicized persona descriptor. */
  line: string;
};

type WhoForShellProps = {
  productName: string;
  /** Pass real personas in v3.9c. If omitted, ships the placeholder set. */
  personas?: WhoForPersona[];
};

const WHO_FOR_PLACEHOLDER: WhoForPersona[] = [
  {line: "CONTENT_NEEDED · Persona 1 — who is this product genuinely for? (1 specific line, not 'everyone')"},
  {line: 'CONTENT_NEEDED · Persona 2'},
  {line: 'CONTENT_NEEDED · Persona 3'},
  {line: 'CONTENT_NEEDED · Persona 4 (optional)'},
];

export function WhoForShell({productName, personas}: WhoForShellProps) {
  const list = personas ?? WHO_FOR_PLACEHOLDER;
  const usingPlaceholder = !personas;
  return (
    <section className="v39a-section" style={{padding: '88px 0', background: 'var(--ink-deep, #0F0A1F)', color: '#FAF8F5'}}>
      <GradientOrb color="purple" intensity="soft" size={460} top="20%" left="-4%" />
      <NoiseTexture />
      <div style={{maxWidth: 960, margin: '0 auto', padding: '0 var(--space-5)'}}>
        <SectionFade as="div" style={{maxWidth: 640, marginBottom: 32}}>
          <div className="section-eyebrow" style={{color: '#9264E5'}}>Who this is for</div>
          <h2 style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '8px 0 12px'}}>
            {productName} sells hardest to these people.
          </h2>
          {usingPlaceholder ? <ShellNotice section="6" /> : null}
        </SectionFade>
        <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12}}>
          {list.map((p, i) => (
            <SectionFade key={i} as="li" delayMs={i * 60}>
              <div className="v39a-hover-lift" style={{
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.04)',
                borderLeft: '3px solid #EC4899',
                borderRadius: '0 12px 12px 0',
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: 'italic',
                fontSize: 19,
                lineHeight: 1.5,
                color: usingPlaceholder ? 'rgba(250,248,245,0.55)' : 'rgba(250,248,245,0.92)',
              }}>
                {p.line}
              </div>
            </SectionFade>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================================
// Section 7 — "Who this is NOT for" (honest exclusions)
// ============================================================

type WhoNotForShellProps = {
  productName: string;
  /** 2-3 honest exclusion lines. */
  exclusions?: string[];
};

const WHO_NOT_FOR_PLACEHOLDER: string[] = [
  "CONTENT_NEEDED · Exclusion 1 — who specifically should NOT buy this, and what they should buy instead",
  'CONTENT_NEEDED · Exclusion 2',
  'CONTENT_NEEDED · Exclusion 3 (optional)',
];

export function WhoNotForShell({productName, exclusions}: WhoNotForShellProps) {
  const list = exclusions ?? WHO_NOT_FOR_PLACEHOLDER;
  const usingPlaceholder = !exclusions;
  return (
    <section className="v39a-section" style={{padding: '88px 0', background: 'var(--bone, #FAF8F5)'}}>
      <NoiseTexture />
      <div style={{maxWidth: 960, margin: '0 auto', padding: '0 var(--space-5)'}}>
        <SectionFade as="div" style={{maxWidth: 640, marginBottom: 32}}>
          <div className="section-eyebrow">Who this is not for</div>
          <h2 style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '8px 0 12px', color: 'var(--ink, #1F1240)'}}>
            {productName} is not for everyone. Honestly.
          </h2>
          {usingPlaceholder ? <ShellNotice section="7" light /> : null}
        </SectionFade>
        <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12}}>
          {list.map((line, i) => (
            <SectionFade key={i} as="li" delayMs={i * 60}>
              <div className="v39a-hover-lift" style={{
                padding: '20px 24px',
                background: '#FFFFFF',
                border: '1px solid rgba(31,18,64,0.10)',
                borderLeft: '3px solid #6B46C1',
                borderRadius: '0 12px 12px 0',
                fontSize: 16,
                lineHeight: 1.55,
                color: usingPlaceholder ? 'rgba(31,18,64,0.45)' : 'var(--ink, #1F1240)',
              }}>
                {line}
              </div>
            </SectionFade>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================================
// Section 8 — "What's in it for you" (outcomes — needs real data)
// ============================================================

export type OutcomeCard = {
  label: string;            // e.g. "Hours saved per week"
  value: string;            // e.g. "8–12 hours" (RANGE or qualitative only)
  detail?: string;          // optional subtext line
};

type OutcomesShellProps = {
  productName: string;
  outcomes?: OutcomeCard[];
};

const OUTCOMES_PLACEHOLDER: OutcomeCard[] = [
  {label: 'CONTENT_NEEDED · Outcome 1 metric', value: 'CONTENT_NEEDED · value or range', detail: 'CONTENT_NEEDED · short subtext explaining context'},
  {label: 'CONTENT_NEEDED · Outcome 2 metric', value: 'CONTENT_NEEDED · value or range'},
  {label: 'CONTENT_NEEDED · Outcome 3 metric', value: 'CONTENT_NEEDED · value or range'},
  {label: 'CONTENT_NEEDED · Outcome 4 metric', value: 'CONTENT_NEEDED · value or range'},
];

export function OutcomesShell({productName, outcomes}: OutcomesShellProps) {
  const cards = outcomes ?? OUTCOMES_PLACEHOLDER;
  const usingPlaceholder = !outcomes;
  return (
    <section className="v39a-section" style={{padding: '96px 0', background: 'linear-gradient(180deg, #150828 0%, #0F0A1F 100%)', color: '#FAF8F5'}}>
      <GradientOrb color="pink" intensity="soft" size={520} top="40%" right="-6%" />
      <GradientOrb color="purple" intensity="soft" size={440} top="15%" left="-4%" />
      <NoiseTexture />
      <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
        <SectionFade as="div" style={{maxWidth: 680, marginBottom: 48}}>
          <div className="section-eyebrow" style={{color: '#FF9BCE'}}>What's in it for you</div>
          <h2 style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(32px, 4.4vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '8px 0 12px'}}>
            What buyers report after a month with {productName}.
          </h2>
          {usingPlaceholder ? <ShellNotice section="8" /> : null}
        </SectionFade>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
        }}>
          {cards.map((c, i) => (
            <SectionFade key={i} as="div" delayMs={i * 60}>
              <article className="v39a-hover-lift" style={{
                padding: 24,
                background: 'rgba(255,255,255,0.03)',
                border: '1.5px solid rgba(255,255,255,0.08)',
                borderRadius: 18,
                height: '100%',
              }}>
                <div style={{fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '2.4px', color: usingPlaceholder ? 'rgba(255,155,206,0.45)' : '#FF9BCE', marginBottom: 12}}>
                  {c.label}
                </div>
                <div className={usingPlaceholder ? '' : 'v39a-gradient-text'} style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 'clamp(28px, 3.4vw, 40px)',
                  fontStyle: 'italic',
                  lineHeight: 1.0,
                  marginBottom: 6,
                  color: usingPlaceholder ? 'rgba(250,248,245,0.40)' : undefined,
                }}>
                  {c.value}
                </div>
                {c.detail ? (
                  <div style={{fontSize: 13, lineHeight: 1.5, color: usingPlaceholder ? 'rgba(250,248,245,0.40)' : 'rgba(250,248,245,0.65)', marginTop: 8}}>
                    {c.detail}
                  </div>
                ) : null}
              </article>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 10 — "Comparison vs alternatives" (the winning table)
// ============================================================

export type ComparisonRow = {
  attribute: string;
  /** Cell for this product. */
  product: string;
  /** Cell for the "course / mentorship" column. */
  course: string;
  /** Cell for the "free Reddit prompts / YouTube" column. */
  free: string;
  /** Cell for the "DIY ChatGPT" column. */
  diy: string;
};

type ComparisonShellProps = {
  productName: string;
  rows?: ComparisonRow[];
};

const COMPARISON_PLACEHOLDER: ComparisonRow[] = [
  {attribute: 'CONTENT_NEEDED · attribute 1 (e.g. Price)', product: 'CONTENT_NEEDED', course: 'CONTENT_NEEDED', free: 'CONTENT_NEEDED', diy: 'CONTENT_NEEDED'},
  {attribute: 'CONTENT_NEEDED · attribute 2 (e.g. Frameworks)', product: 'CONTENT_NEEDED', course: 'CONTENT_NEEDED', free: 'CONTENT_NEEDED', diy: 'CONTENT_NEEDED'},
  {attribute: 'CONTENT_NEEDED · attribute 3 (e.g. Examples)', product: 'CONTENT_NEEDED', course: 'CONTENT_NEEDED', free: 'CONTENT_NEEDED', diy: 'CONTENT_NEEDED'},
  {attribute: 'CONTENT_NEEDED · attribute 4 (e.g. Updates)', product: 'CONTENT_NEEDED', course: 'CONTENT_NEEDED', free: 'CONTENT_NEEDED', diy: 'CONTENT_NEEDED'},
  {attribute: 'CONTENT_NEEDED · attribute 5 (e.g. Time to win)', product: 'CONTENT_NEEDED', course: 'CONTENT_NEEDED', free: 'CONTENT_NEEDED', diy: 'CONTENT_NEEDED'},
];

export function ComparisonShell({productName, rows}: ComparisonShellProps) {
  const data = rows ?? COMPARISON_PLACEHOLDER;
  const usingPlaceholder = !rows;
  return (
    <section className="v39a-section" style={{padding: '96px 0', background: 'var(--bone, #FAF8F5)'}}>
      <GradientOrb color="purple" intensity="soft" size={440} top="20%" right="-4%" />
      <NoiseTexture />
      <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
        <SectionFade as="div" style={{maxWidth: 680, marginBottom: 32}}>
          <div className="section-eyebrow">vs alternatives</div>
          <h2 style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '8px 0 12px', color: 'var(--ink, #1F1240)'}}>
            {productName} vs. what else you'd buy.
          </h2>
          {usingPlaceholder ? <ShellNotice section="10" light /> : null}
        </SectionFade>

        <div style={{
          overflowX: 'auto' as const,
          border: '1px solid rgba(31,18,64,0.10)',
          borderRadius: 14,
          background: '#FFFFFF',
        }}>
          <table style={{width: '100%', borderCollapse: 'collapse' as const, minWidth: 720, fontFamily: 'Inter, system-ui, sans-serif'}}>
            <thead>
              <tr style={{background: 'rgba(107,70,193,0.04)'}}>
                <th style={th()}>&nbsp;</th>
                <th style={{...th(), background: 'rgba(146,100,229,0.10)', color: '#3B1F6B'}}>{productName}</th>
                <th style={th()}>$2k+ course</th>
                <th style={th()}>Free prompts</th>
                <th style={th()}>DIY ChatGPT</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} style={{borderTop: '1px solid rgba(31,18,64,0.06)'}}>
                  <td style={{...td(), fontWeight: 700, color: 'rgba(31,18,64,0.65)'}}>{row.attribute}</td>
                  <td style={{...td(), background: 'rgba(146,100,229,0.06)', color: usingPlaceholder ? 'rgba(31,18,64,0.40)' : '#3B1F6B', fontWeight: 600}}>{row.product}</td>
                  <td style={{...td(), color: usingPlaceholder ? 'rgba(31,18,64,0.40)' : 'var(--ink, #1F1240)'}}>{row.course}</td>
                  <td style={{...td(), color: usingPlaceholder ? 'rgba(31,18,64,0.40)' : 'var(--ink, #1F1240)'}}>{row.free}</td>
                  <td style={{...td(), color: usingPlaceholder ? 'rgba(31,18,64,0.40)' : 'var(--ink, #1F1240)'}}>{row.diy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Shared shell notice — visible reminder during placeholder state
// ============================================================

function ShellNotice({section, light = false}: {section: string; light?: boolean}) {
  const bg = light ? 'rgba(236,72,153,0.08)' : 'rgba(236,72,153,0.14)';
  const fg = light ? '#7A1245' : '#FF9BCE';
  const border = light ? 'rgba(236,72,153,0.20)' : 'rgba(236,72,153,0.30)';
  return (
    <div style={{
      display: 'inline-flex' as const,
      alignItems: 'center' as const,
      gap: 8,
      marginTop: 8,
      padding: '6px 12px',
      borderRadius: 999,
      background: bg,
      border: `1px solid ${border}`,
      color: fg,
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '1.6px',
    }}>
      <span aria-hidden style={{width: 7, height: 7, borderRadius: 999, background: fg, display: 'inline-block'}} />
      v3.9c · SECTION {section} · EDITORIAL CONTENT_NEEDED
    </div>
  );
}

// Inline th/td style helpers (kept local to avoid adding a new CSS class
// when the table only appears in this shell).
function th(): React.CSSProperties {
  return {textAlign: 'left' as const, padding: '14px 16px', fontSize: 12, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase' as const, color: 'rgba(31,18,64,0.55)'};
}
function td(): React.CSSProperties {
  return {textAlign: 'left' as const, padding: '14px 16px', fontSize: 14, lineHeight: 1.5};
}
