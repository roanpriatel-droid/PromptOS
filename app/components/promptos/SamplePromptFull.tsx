import {Link} from 'react-router';
import type {Pack} from '~/lib/packs';
import {SectionFade} from './SectionFade';

/**
 * Full-render of a sample prompt — exactly as it appears in the .docx.
 * Six fields, monospace body, pink left border. The conversion bait.
 */
export function SamplePromptFull({pack}: {pack: Pack}) {
  const s = pack.sample;
  return (
    <section className="sample-full">
      <div className="sample-full-inner">
        <SectionFade as="div" className="sample-full-head">
          <div className="section-eyebrow">A real prompt from the pack</div>
          <h2>See exactly what you&apos;re getting.</h2>
          <p>
            Below is one of the {pack.promptCount} prompts in {pack.name},
            rendered exactly as it appears in the .docx.
          </p>
        </SectionFade>

        <SectionFade as="div" className="sample-full-card">
          <div className="pn">{s.number}</div>
          <div className="title">{s.title}</div>

          <div className="sample-field">
            <div className="key">Use case</div>
            <div className="val">{s.useCase}</div>
          </div>

          <div className="sample-field">
            <div className="key">The prompt</div>
            <div className="val mono">{s.prompt}</div>
          </div>

          <div className="sample-field">
            <div className="key">Customize</div>
            <div className="val">{s.customize}</div>
          </div>

          <div className="sample-field">
            <div className="key">Example output (snippet)</div>
            <div className="val example">{s.exampleOutput}</div>
          </div>

          <div className="sample-field pro">
            <div className="key">Pro tip</div>
            <div className="val">{s.proTip}</div>
          </div>
        </SectionFade>

        <p className="sample-full-more">
          +{pack.promptCount - 1} more prompts inside.{' '}
          <Link to={`/products/${pack.shopifyHandle}`} prefetch="intent">
            Get {pack.name} · ${pack.priceUSD} →
          </Link>
        </p>
      </div>
    </section>
  );
}
