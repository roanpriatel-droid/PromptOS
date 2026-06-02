import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

type FounderNoteProps = {
  /** Override the heading paragraph; defaults to the homepage copy. */
  heading?: string;
  /** Override the body paragraphs; defaults to the homepage copy. */
  body?: string[];
};

const DEFAULT_HEADING =
  'I built the first version of these packs for myself, then six friends, then their teams. Then I stopped giving them away.';

const DEFAULT_BODY = [
  "The honest version: I'd been writing prompts in a Google Doc for a year. Every time a friend asked \"how do you get Claude to do X?\", I'd copy three lines into a DM. After enough DMs, I realized I had a product.",
  'So I sorted them into packs. I tested every prompt across Claude, ChatGPT, and Gemini, twenty times each, and threw out anything that didn’t survive. Then I wrote new ones for the gaps. Then I wrote playbooks for the questions buyers kept asking after the prompts. The result is what’s on this site.',
  "It's not magic. It's just better than what you'd write at 11pm on a Tuesday.",
];

export function FounderNote({
  heading = DEFAULT_HEADING,
  body = DEFAULT_BODY,
}: FounderNoteProps) {
  return (
    <section className="founder v39a-section">
      {/* v3.9b D11 — deep purple orb behind the founder note + pink quote mark */}
      <GradientOrb color="purple" intensity="medium" size={460} top="25%" left="14%" />
      <NoiseTexture />
      <div className="founder-inner">
        <div className="eyebrow">A note from the founder</div>
        <span aria-hidden style={{display: 'block', fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 96, lineHeight: 0.7, color: '#EC4899', marginBottom: 12, marginLeft: -6, opacity: 0.85}}>&ldquo;</span>
        <h3>{heading}</h3>
        {body.map((p) => (
          <p key={p.slice(0, 30)}>{p}</p>
        ))}
        <div className="signature">
          <div className="avatar v39a-pulse-purple">N</div>
          <div className="text">
            <div className="name">Nathan</div>
            <div className="role">Founder, Promptos</div>
          </div>
        </div>
      </div>
    </section>
  );
}
