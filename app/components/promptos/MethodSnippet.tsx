import {Link} from 'react-router';
import {SectionFade} from './SectionFade';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

/**
 * Homepage method snippet — three principle cards instead of the full
 * editorial column, linking to /method for the manifesto.
 */
const PILLARS = [
  {
    label: 'The prompts',
    title: 'Twenty real uses across three models.',
    body: 'If a prompt doesn\'t survive on Claude, ChatGPT, and Gemini, it gets a tuning note, or it gets cut. No "100 ChatGPT prompts" lists.',
  },
  {
    label: 'The playbooks',
    title: 'Written by operators. Read by two more.',
    body: 'Every playbook is written by someone who ran the business, then reviewed by two operators currently running it. We rewrite until both sign off.',
  },
  {
    label: 'Both',
    title: 'Templates that work Tuesday.',
    body: 'Editable .docx and PDF. Real scripts, real numbers, real contracts. No fill-in-the-blank Mad Libs. The version on your machine differs from someone else\'s by week two.',
  },
];

export function MethodSnippet() {
  return (
    <section className="method-snippet v39a-section">
      {/* v3.9b D10 — single purple orb behind the three pillars */}
      <GradientOrb color="purple" intensity="soft" size={520} top="40%" left="50%" />
      <NoiseTexture />
      <div className="method-snippet-inner">
        <SectionFade as="div" className="method-snippet-head">
          <div className="section-eyebrow">The method</div>
          <h2>One quality bar. <em>Two product lines.</em></h2>
          <p>The full manifesto lives on <Link className="text-link" to="/method">/method</Link>. The short version is below.</p>
        </SectionFade>

        <div className="method-snippet-grid">
          {PILLARS.map((p, i) => (
            <SectionFade key={p.label} as="div" className="method-pillar" delayMs={i * 100}>
              <div className="label">{p.label}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}
