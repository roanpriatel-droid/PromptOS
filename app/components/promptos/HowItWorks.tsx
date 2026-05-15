import {SectionFade} from './SectionFade';

const STEPS = [
  {
    n: '1',
    title: 'Pick a pack',
    body: 'Browse seven packs built for specific professions, or grab the bundle in one move.',
  },
  {
    n: '2',
    title: 'Download instantly',
    body: 'Get the .docx file in your inbox seconds after checkout. No accounts, no DRM.',
  },
  {
    n: '3',
    title: 'Paste and profit',
    body: 'Copy prompts straight into Claude, ChatGPT, or Gemini. Customize as needed.',
  },
];

export function HowItWorks() {
  return (
    <section className="how-section">
      <div className="how-inner">
        <SectionFade as="div" className="how-head">
          <div className="section-eyebrow">How it works</div>
          <h2>Three steps. Then you&apos;re shipping.</h2>
        </SectionFade>

        <div className="how-grid">
          {STEPS.map((step, i) => (
            <SectionFade key={step.n} as="div" className="how-step" delayMs={i * 120}>
              <div className="num">{step.n}</div>
              <div className="num-badge">{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}
