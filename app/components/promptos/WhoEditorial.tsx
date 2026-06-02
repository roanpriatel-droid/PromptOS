import {SectionFade} from './SectionFade';
import {GradientOrb} from '~/components/atmosphere/GradientOrb';
import {NoiseTexture} from '~/components/atmosphere/NoiseTexture';

const ROWS = [
  {
    name: 'Marketers.',
    body: [
      'You run paid, lifecycle, or brand at a startup or growth-stage company. You ship weekly and have a soft spot for prompts that actually convert.',
    ],
    quote: '"The first prompt pack that didn\'t read like fan fiction.", Jules M., Head of Growth',
  },
  {
    name: 'Founders.',
    body: [
      'You wear seven hats and the seventh is "person who writes the investor update at 11pm." Promptos cuts that hour to twelve minutes.',
    ],
    quote: '"Took my investor updates from 4 hours to 40 minutes.", Nikki K., Solo founder',
  },
  {
    name: 'Engineers.',
    body: [
      'You use AI as a second pair of eyes, not as autocomplete. You want prompts that bring back the trade-offs, not just the code.',
    ],
    quote: '"The code review pack alone was worth $35.", Alex L., Staff engineer',
  },
  {
    name: 'Creators.',
    body: [
      'You ship a newsletter, a channel, and three other things on the side. The repurposing pack alone gives you back a Saturday.',
    ],
    quote: '"I run 3 channels off the Creator pack.", Rae T., YouTuber, 280k subs',
  },
];

export function WhoEditorial() {
  return (
    <section className="who-editorial v39a-section">
      {/* v3.9b D9 — persona section gets a purple orb top-left, pink bottom-right */}
      <GradientOrb color="purple" intensity="soft" size={500} top="10%" left="-6%" />
      <GradientOrb color="pink" intensity="soft" size={420} bottom="20%" right="-4%" />
      <NoiseTexture />
      <div className="who-editorial-inner">
        <SectionFade as="div">
          <div className="section-eyebrow">Who it&apos;s for</div>
          <h2>Made for people who do the work.</h2>
        </SectionFade>

        <div className="who-list">
          {ROWS.map((row, i) => (
            <SectionFade key={row.name} as="div" className="who-row" delayMs={i * 80}>
              <div className="who-name">{row.name}</div>
              <div className="who-body">
                {row.body.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
                <div className="quote">{row.quote}</div>
              </div>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}
