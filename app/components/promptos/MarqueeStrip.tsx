/**
 * "Works with" marquee — model names scroll horizontally and the
 * track is duplicated so the loop is seamless. (Replaces the old
 * "as featured in" marquee. Promptos works with every major LLM.)
 */
const MODELS = [
  'Claude',
  'ChatGPT',
  'Gemini',
  'Grok',
  'Perplexity',
  'Mistral',
  'Llama',
  'Copilot',
];

export function MarqueeStrip() {
  return (
    <section className="marquee-section" aria-label="Works with every major AI model">
      <p className="marquee-label">Works with</p>
      <div className="marquee">
        <div className="marquee-track">
          {[...MODELS, ...MODELS].map((name, i) => (
            <span key={`${name}-${i}`} className="marquee-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
