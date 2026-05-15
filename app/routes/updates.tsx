import type {Route} from './+types/updates';
import {SectionFade} from '~/components/promptos/SectionFade';

export const meta: Route.MetaFunction = () => [
  {title: 'Updates · Promptos'},
  {
    name: 'description',
    content:
      'What\'s shipped, what\'s in flight, what\'s next. Every prompt added to every pack since launch.',
  },
];

const ENTRIES: Array<{
  date: string;
  pack: string;
  pill: string;
  title: string;
  body: string;
}> = [
  {
    date: '2026-05-12',
    pack: 'Marketer\'s Pack',
    pill: 'Added',
    title: '3 new email prompts: re-engagement, lapsed re-onboard, win-back P.S.',
    body: 'Three new prompts for the lifecycle section: a re-engagement series builder, a lapsed-user re-onboard email, and a P.S.-driven win-back. Plus a small tuning note on the existing "Subject-Line Battery" prompt.',
  },
  {
    date: '2026-05-04',
    pack: 'AI Power User Pack',
    pill: 'Updated',
    title: 'The Self-Critique Loop, rewritten for Claude 4.7',
    body: 'The original Self-Critique Loop got verbose on Claude 4.7. Rewritten with a tighter rubric and a four-step refinement spine that holds across all three commercial models.',
  },
  {
    date: '2026-04-22',
    pack: 'Developer\'s Pack',
    pill: 'Added',
    title: '2 new code-review prompts: race conditions, N+1 sweep',
    body: 'Two new code review prompts: a "race condition smell test" for concurrent code paths and an "N+1 query sweep" for ORM-heavy apps. Both stress-tested against Claude + GPT.',
  },
  {
    date: '2026-04-08',
    pack: 'Content Creator Pack',
    pill: 'Added',
    title: '11 new prompts: full TikTok / Shorts section',
    body: 'Brand-new section: 11 short-form video prompts. Hooks, series concepts, trend adaptors, voiceover scripts. Built with three creator collaborators (combined 1.2M followers).',
  },
];

const MONTHS_GROUPED = ENTRIES.reduce<Record<string, typeof ENTRIES>>((acc, entry) => {
  const date = new Date(entry.date);
  const key = date.toLocaleDateString(undefined, {month: 'long', year: 'numeric'});
  if (!acc[key]) acc[key] = [];
  acc[key].push(entry);
  return acc;
}, {});

export default function Updates() {
  return (
    <main id="main" className="page is-active" data-page="updates">
      <section className="editorial-page" style={{paddingBottom: 24}}>
        <div className="editorial-inner">
          <SectionFade as="div">
            <div className="eyebrow section-eyebrow">Updates</div>
            <h1>What we&apos;ve <em>shipped.</em></h1>
            <p className="lede">
              Every prompt added, every prompt tuned, every pack expanded ,
              listed here so existing buyers know exactly what they&apos;re
              getting in their lifetime updates.
            </p>
          </SectionFade>
        </div>
      </section>

      <div className="timeline">
        {Object.entries(MONTHS_GROUPED).map(([month, entries]) => (
          <SectionFade key={month} as="div">
            <div className="timeline-month">{month}</div>
            {entries.map((e) => (
              <div className="timeline-entry" key={e.title}>
                <div>
                  <span className="date">{new Date(e.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                  <span className="pill">{e.pack}</span>
                  <span className="pill" style={{background: 'var(--purple-50)', color: 'var(--promptos-purple)'}}>{e.pill}</span>
                </div>
                <h4>{e.title}</h4>
                <p>{e.body}</p>
              </div>
            ))}
          </SectionFade>
        ))}
      </div>

      <section style={{padding: '80px 0', textAlign: 'center'}}>
        <p style={{color: 'var(--fg-3)', fontSize: 15}}>
          Subscribed buyers get every update by email. <a className="text-link" href="/contact">Lost your link?</a>
        </p>
      </section>
    </main>
  );
}
