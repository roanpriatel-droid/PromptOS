import {useState} from 'react';
import {CoverV39, hasV39Cover} from './CoverV39';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

/**
 * v3.9b — multi-view product gallery (option 2 scope).
 *
 * Renders 3 of the 5 spec'd views (V4 Template Preview + V5 Results
 * Dashboard are explicitly deferred):
 *   V1 — Cover  (the v3.9 cover from CoverV39, or a fallback message)
 *   V2 — Spread (a designed mockup of two facing pages of the product)
 *   V3 — Index  (the table of contents rendered as a stylized index card)
 *
 * Mobile: stacks all three views vertically with a heading per view.
 * Desktop: large main view + small thumbnail rail below for switching.
 *
 * NOT a route file — drop on any product page above (or alongside) the
 * existing hero.
 */

export type GalleryToCItem = {
  /** "Section" name for packs, "Chapter" name for guides. */
  name: string;
  /** Optional sub-detail (e.g. prompt count, page count). */
  meta?: string;
};

type View = 'cover' | 'spread' | 'toc';

type Props = {
  /** Product slug — used to look up the v3.9 cover. */
  slug: string;
  /** Display name for accessibility / labels. */
  name: string;
  /** Product type — drives the spread mockup label and the index header. */
  kind: 'pack' | 'guide' | 'authority';
  /** Eyebrow line above the gallery (e.g. "PACK Nº 01"). */
  eyebrow?: string;
  /** Index items for V3 (sections for packs/authority, chapters for guides). */
  toc: GalleryToCItem[];
  /** A representative prompt title + body excerpt for the V2 spread mockup. */
  spread: {
    sectionLabel: string;
    promptTitle: string;
    promptBody: string;
    proTip: string;
  };
};

export function ProductGallery(props: Props) {
  const {slug, name, kind, eyebrow, toc, spread} = props;
  const [active, setActive] = useState<View>('cover');
  const hasCover = hasV39Cover(slug);

  return (
    <section className="v39a-section" style={{padding: '64px 0 32px'}}>
      <GradientOrb color="purple" intensity="soft" size={520} top="30%" left="-6%" />
      <GradientOrb color="pink" intensity="soft" size={420} bottom="10%" right="-4%" />
      <NoiseTexture />

      <div style={{maxWidth: 1180, margin: '0 auto', padding: '0 var(--space-5)'}}>
        {eyebrow ? (
          <div className="section-eyebrow" style={{marginBottom: 12}}>{eyebrow}</div>
        ) : null}

        {/* Main view container */}
        <div
          style={{
            position: 'relative',
            borderRadius: 24,
            overflow: 'hidden',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
            boxShadow: 'var(--v39a-elevation-raised)',
            aspectRatio: '4 / 3',
            maxWidth: 760,
            margin: '0 auto',
          }}
        >
          {active === 'cover' ? (
            hasCover ? (
              <CoverV39 slug={slug} alt={name} />
            ) : (
              <FallbackCover name={name} />
            )
          ) : null}
          {active === 'spread' ? <SpreadMockup kind={kind} {...spread} /> : null}
          {active === 'toc' ? <TocMockup kind={kind} name={name} toc={toc} /> : null}
        </div>

        {/* Thumbnail rail */}
        <div
          role="tablist"
          aria-label={`${name} gallery views`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            maxWidth: 480,
            margin: '24px auto 0',
          }}
        >
          {(['cover', 'spread', 'toc'] as View[]).map((v) => {
            const label = v === 'cover' ? 'Cover' : v === 'spread' ? 'Spread' : 'Index';
            return (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={active === v}
                onClick={() => setActive(v)}
                className="v39a-hover-lift"
                style={{
                  padding: '14px 8px',
                  borderRadius: 12,
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  background:
                    active === v
                      ? 'linear-gradient(135deg, rgba(146,100,229,0.35), rgba(236,72,153,0.25))'
                      : 'rgba(255,255,255,0.03)',
                  color: '#FAF8F5',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '2.4px',
                  cursor: 'pointer',
                  textTransform: 'uppercase' as const,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <p style={{textAlign: 'center', marginTop: 18, fontSize: 12, color: 'var(--fg-3, rgba(250,248,245,0.55))', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '1.2px'}}>
          3 of 5 views shown. Template + results-dashboard previews ship in v3.9c.
        </p>
      </div>
    </section>
  );
}

function FallbackCover({name}: {name: string}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        background:
          'linear-gradient(135deg, #1F1240 0%, #3B1F6B 50%, #1F1240 100%)',
        color: '#FAF8F5',
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 36,
        fontStyle: 'italic',
      }}
    >
      {name}
    </div>
  );
}

function SpreadMockup({
  kind,
  sectionLabel,
  promptTitle,
  promptBody,
  proTip,
}: {kind: 'pack' | 'guide' | 'authority'} & Props['spread']) {
  const leftTitle = kind === 'guide' ? 'Chapter excerpt' : 'Prompt';
  const rightTitle = kind === 'guide' ? 'Worksheet' : 'Example output';
  return (
    <div style={{width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, padding: 20, background: 'linear-gradient(180deg, #2A1748 0%, #150828 100%)'}}>
      {/* Left page */}
      <div style={{background: '#FAF6EC', borderRadius: 10, padding: 24, color: '#1F1240', position: 'relative', overflow: 'hidden'}}>
        <div style={{fontFamily: 'Inter, system-ui, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '2px', color: '#6B46C1', marginBottom: 10}}>
          {sectionLabel.toUpperCase()} · {leftTitle.toUpperCase()}
        </div>
        <div style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontStyle: 'italic', marginBottom: 12, lineHeight: 1.1}}>
          {promptTitle}
        </div>
        <div style={{fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, lineHeight: 1.55, color: '#3B1F6B', whiteSpace: 'pre-line' as const}}>
          {promptBody}
        </div>
        <div style={{position: 'absolute', bottom: 12, right: 16, fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 11, fontStyle: 'italic', color: 'rgba(31,18,64,0.55)'}}>— 24 —</div>
      </div>
      {/* Right page */}
      <div style={{background: '#FFFFFF', borderRadius: 10, padding: 24, color: '#1F1240', position: 'relative', overflow: 'hidden'}}>
        <div style={{fontFamily: 'Inter, system-ui, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '2px', color: '#EC4899', marginBottom: 10}}>
          {rightTitle.toUpperCase()}
        </div>
        <div style={{background: 'rgba(107,70,193,0.06)', borderRadius: 8, padding: 14, fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, lineHeight: 1.55, color: '#1F1240', marginBottom: 16}}>
          {/* Mock chat-bubble */}
          {kind === 'guide'
            ? 'Use the template at the back of this chapter. Fill in the bracketed sections with your numbers; the worksheet calculates the rest.'
            : '"You ship for hospitals. I spec\'d one last week." — Claude · 14 words, no questions, opens on the pain.'}
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(236,72,153,0.10)', borderRadius: 999}}>
          <span style={{width: 8, height: 8, borderRadius: 999, background: '#EC4899', flexShrink: 0}} aria-hidden />
          <span style={{fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, fontWeight: 600, color: '#1F1240'}}>{proTip}</span>
        </div>
        <div style={{position: 'absolute', bottom: 12, right: 16, fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 11, fontStyle: 'italic', color: 'rgba(31,18,64,0.55)'}}>— 25 —</div>
      </div>
    </div>
  );
}

function TocMockup({kind, name, toc}: {kind: 'pack' | 'guide' | 'authority'; name: string; toc: GalleryToCItem[]}) {
  const heading = kind === 'guide' ? 'Chapters' : 'Sections';
  return (
    <div style={{width: '100%', height: '100%', padding: 28, background: 'linear-gradient(180deg, #1F1240 0%, #0F0A1F 100%)', color: '#FAF8F5', display: 'flex', flexDirection: 'column' as const, gap: 16}}>
      <div>
        <div style={{fontFamily: 'Inter, system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '2.8px', color: '#EC4899', marginBottom: 6}}>
          INDEX
        </div>
        <div style={{fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontStyle: 'italic'}}>
          {name} — {heading.toLowerCase()}
        </div>
      </div>
      <ol style={{listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontFamily: 'Inter, system-ui, sans-serif', fontSize: 14, lineHeight: 1.45}}>
        {toc.map((item, i) => (
          <li key={item.name} style={{display: 'flex', alignItems: 'baseline', gap: 14, borderBottom: '1px dotted rgba(255,255,255,0.18)', paddingBottom: 8}}>
            <span style={{fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 12, color: 'rgba(255,255,255,0.45)', minWidth: 28}}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{flex: 1, fontWeight: 600, color: '#FAF8F5'}}>{item.name}</span>
            {item.meta ? <span style={{fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: "'JetBrains Mono', ui-monospace, monospace"}}>{item.meta}</span> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
