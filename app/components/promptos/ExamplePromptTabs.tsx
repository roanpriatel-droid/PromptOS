import {useState} from 'react';
import {SectionFade} from './SectionFade';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

/**
 * v3.9b Section 4 — Real Example Prompt UPGRADE.
 *
 * Three tabs: simple, medium, premium. Each tab shows the prompt body
 * (monospace), the use case, an example output (chat-bubble style),
 * and a pro tip. Copy-to-clipboard on the body.
 *
 * For playbooks, the spec swaps this for an example chapter spread; in
 * v3.9b option-2 scope we ship the prompt-tabs variant only and reuse
 * it for guides with a "chapter excerpt" framing via the `kind` prop.
 */

export type ExamplePrompt = {
  level: 'simple' | 'medium' | 'premium';
  title: string;
  useCase: string;
  body: string;          // multi-line, will render in monospace
  output: string;        // the AI's example response
  proTip: string;
};

type Props = {
  kind: 'pack' | 'guide' | 'authority';
  prompts: ExamplePrompt[]; // length 1-3; we render up to 3
  totalAvailable: number;   // e.g. 65 prompts total
};

export function ExamplePromptTabs({kind, prompts, totalAvailable}: Props) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const p = prompts[active];
  if (!p) return null;

  const handleCopy = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(p.body).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
      () => { /* swallow */ },
    );
  };

  const wordCount = kind === 'guide' ? 'page' : 'prompt';
  const wordCountPlural = kind === 'guide' ? 'pages' : 'prompts';

  return (
    <section className="v39a-section" style={{padding: '96px 0', background: 'linear-gradient(180deg, #0F0A1F 0%, #160928 100%)', color: '#FAF8F5'}}>
      <GradientOrb color="pink" intensity="soft" size={520} top="20%" right="-6%" />
      <GradientOrb color="purple" intensity="soft" size={460} bottom="10%" left="-4%" />
      <NoiseTexture />

      <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 var(--space-5)'}}>
        <SectionFade as="div" style={{maxWidth: 680, marginBottom: 36}}>
          <div className="section-eyebrow" style={{color: '#FF9BCE'}}>Real example {wordCountPlural}</div>
          <h2 style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(32px, 4.4vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '8px 0 12px', color: '#FAF8F5'}}>
            Three {wordCountPlural} you can read right now.
          </h2>
          <p style={{fontSize: 16, lineHeight: 1.55, color: 'rgba(250,248,245,0.70)', maxWidth: 540}}>
            One simple. One medium. One premium. The other {Math.max(0, totalAvailable - prompts.length)} {wordCountPlural} unlock at checkout.
          </p>
        </SectionFade>

        {/* Tab buttons */}
        <div role="tablist" aria-label={`Example ${wordCount} levels`} style={{display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const}}>
          {prompts.map((pp, i) => (
            <button
              key={pp.level}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              style={{
                padding: '12px 20px',
                borderRadius: 999,
                border: '1.5px solid ' + (active === i ? '#EC4899' : 'rgba(255,255,255,0.14)'),
                background: active === i ? 'linear-gradient(135deg, rgba(146,100,229,0.35), rgba(236,72,153,0.25))' : 'rgba(255,255,255,0.04)',
                color: '#FAF8F5',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '2px',
                cursor: 'pointer',
                textTransform: 'uppercase' as const,
              }}
            >
              {pp.level} · {pp.title}
            </button>
          ))}
        </div>

        {/* Body card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 16,
          background: 'rgba(255,255,255,0.03)',
          border: '1.5px solid rgba(255,255,255,0.08)',
          borderRadius: 18,
          padding: 28,
        }}>
          {/* Left: prompt body */}
          <div style={{display: 'flex', flexDirection: 'column' as const, gap: 14}}>
            <div style={{fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '2.4px', color: '#EC4899'}}>
              USE CASE
            </div>
            <p style={{fontSize: 15, lineHeight: 1.55, color: 'rgba(250,248,245,0.80)', margin: 0}}>
              {p.useCase}
            </p>

            <div style={{
              position: 'relative' as const,
              marginTop: 8,
              background: '#0B0518',
              border: '1px solid rgba(146,100,229,0.30)',
              borderRadius: 12,
              padding: '14px 16px',
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 13,
              lineHeight: 1.6,
              color: '#D8C3FF',
              whiteSpace: 'pre-wrap' as const,
              overflow: 'auto',
            }}>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy prompt to clipboard"
                style={{
                  position: 'absolute' as const,
                  top: 8, right: 8,
                  padding: '6px 10px',
                  borderRadius: 999,
                  border: '1px solid rgba(146,100,229,0.35)',
                  background: 'rgba(146,100,229,0.18)',
                  color: '#FAF8F5',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 11, fontWeight: 700, letterSpacing: '1.4px',
                  cursor: 'pointer',
                }}
              >
                {copied ? 'COPIED' : 'COPY'}
              </button>
              {p.body}
            </div>
          </div>

          {/* Right: example output + pro tip */}
          <div style={{display: 'flex', flexDirection: 'column' as const, gap: 14}}>
            <div style={{fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '2.4px', color: '#FF9BCE'}}>
              EXAMPLE OUTPUT
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '14px 16px',
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic' as const,
              fontSize: 16,
              lineHeight: 1.5,
              color: 'rgba(250,248,245,0.90)',
            }}>
              {p.output}
            </div>

            <div style={{
              display: 'flex' as const,
              alignItems: 'flex-start' as const,
              gap: 10,
              padding: '12px 14px',
              borderRadius: 999,
              background: 'rgba(236,72,153,0.10)',
              border: '1px solid rgba(236,72,153,0.30)',
            }}>
              <span aria-hidden style={{width: 10, height: 10, borderRadius: 999, background: '#EC4899', marginTop: 5, flexShrink: 0}} />
              <span style={{fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13, fontWeight: 500, color: '#FAF8F5'}}>
                <strong style={{color: '#FF9BCE'}}>Pro tip · </strong>{p.proTip}
              </span>
            </div>
          </div>
        </div>

        <p style={{textAlign: 'center', marginTop: 24, fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13, color: 'rgba(250,248,245,0.55)'}}>
          {prompts.length} of {totalAvailable} {wordCountPlural} shown. The other {Math.max(0, totalAvailable - prompts.length)} unlock when you buy.
        </p>
      </div>
    </section>
  );
}
