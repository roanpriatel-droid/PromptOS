import type {Guide} from '~/lib/catalog';
import {SectionFade} from './SectionFade';

export function WhoForWhoNotFor({guide}: {guide: Guide}) {
  return (
    <section className="forwhom">
      <div className="forwhom-inner">
        <SectionFade as="div" className="forwhom-col for">
          <h3>Built for:</h3>
          <ul>
            {guide.whoFor.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </SectionFade>
        <SectionFade as="div" className="forwhom-col not" delayMs={120}>
          <h3>Not for:</h3>
          <ul>
            {guide.whoNotFor.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </SectionFade>
      </div>
    </section>
  );
}
