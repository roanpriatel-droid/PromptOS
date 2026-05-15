import type {Route} from './+types/method';
import {SectionFade} from '~/components/promptos/SectionFade';
import {NewsletterCTA} from '~/components/promptos/NewsletterCTA';
import {Link} from 'react-router';

export const meta: Route.MetaFunction = () => [
  {title: 'Method · Promptos'},
  {
    name: 'description',
    content:
      "How Promptos prompts and playbooks get made. Five principles for prompts, four for playbooks. One quality bar across both.",
  },
];

const PROMPT_PRINCIPLES = [
  {
    n: '1',
    title: 'One job per prompt.',
    body: [
      'A prompt that tries to do four things does none of them. Every Promptos prompt has a single, specific job, and asks the model for the exact shape of output you need.',
      "If we can't write the use case on a Post-it, the prompt isn't ready.",
    ],
    quote: '"If you can\'t explain it in one sentence, the prompt is wrong, not the explanation."',
  },
  {
    n: '2',
    title: 'Tested before it ships.',
    body: [
      "Every prompt is run against Claude, ChatGPT, and Gemini. Twenty real uses each. If it doesn't survive on any of the three models, it gets a tuning note, or it gets cut.",
      "That bar quietly throws out most \"100 ChatGPT prompts\" lists you've seen.",
    ],
    quote: '"Survives twenty real uses or it doesn\'t ship."',
  },
  {
    n: '3',
    title: 'Specific over clever.',
    body: [
      "The best prompts read like a brief, not like a magic spell. We write them the way a senior person would write a request to a junior person, clear, opinionated, concrete.",
      'No mystery incantations. No tokens-as-magic. Just unambiguous direction.',
    ],
    quote: '"Write the prompt the way a tired editor would brief a junior writer."',
  },
  {
    n: '4',
    title: 'Editable on purpose.',
    body: [
      "Ships as .docx so you can fork it, brand it, tune it. The version on your machine should be different from the version on someone else's after a week.",
      'A tool you own beats a tool you rent.',
    ],
    quote: '"A tool you own beats a tool you rent."',
  },
  {
    n: '5',
    title: 'A pro tip per prompt.',
    body: [
      'Every prompt ends with a one-line "pro tip", the follow-up move, the non-obvious tweak, the part you only learn after using the prompt fifty times.',
      "That's the field people screenshot.",
    ],
    quote: '"The pro tip is where the price stops being a question."',
  },
];

const PLAYBOOK_PRINCIPLES = [
  {
    n: '1',
    title: 'Written by operators, not coaches.',
    body: [
      'Every Promptos playbook is written by someone who has actually run that business, not someone who has run the course for that business.',
      "If we haven't shipped the work, we haven't shipped the playbook.",
    ],
    quote: '"The course is the sales funnel. We sell the actual product."',
  },
  {
    n: '2',
    title: 'Finished, not directional.',
    body: [
      "A playbook is a complete plan, not a framework. By the time you finish reading, you have a 90-day roadmap, a positioning, an offer, a price, and the templates to execute.",
      "If you still have to assemble the answer yourself, the playbook isn't finished.",
    ],
    quote: '"You don\'t need eighty videos. You need one finished plan."',
  },
  {
    n: '3',
    title: 'Templates that work Tuesday.',
    body: [
      'Cold emails. Discovery scripts. Contracts. Proposals. Pricing calculators. The exact files an operator would actually pay $5k for in a consulting call.',
      'No "fill in the blank with your story." Real working copy you can adapt in 15 minutes.',
    ],
    quote: '"The templates are the playbook. The chapters are the manual."',
  },
  {
    n: '4',
    title: 'Reviewed by two real operators.',
    body: [
      "Every playbook is read end-to-end by two operators currently running that business. They flag the gaps, the wrong numbers, the missing edge cases.",
      'We rewrite until both signers say "I\'d hand this to someone joining my team."',
    ],
    quote: '"If two operators wouldn\'t hand this to a new hire, it\'s not done."',
  },
];

export default function MethodPage() {
  return (
    <main id="main" className="page is-active method-editorial" data-page="method">
      <div className="method-editorial-inner">
        <SectionFade as="div">
          <div className="eyebrow section-eyebrow">Method</div>
          <h2>One quality bar. Two product lines.</h2>
          <p style={{fontSize: 19, lineHeight: 1.7, color: 'var(--ink-soft)', marginTop: 16}}>
            Promptos ships two kinds of products, prompt packs and playbooks. They look different,
            sell at different prices, and solve different problems. But they pass the same set of
            principles before they ship. Here&apos;s the full bar.
          </p>
        </SectionFade>

        <SectionFade as="div" style={{marginTop: 64}}>
          <div className="section-eyebrow" style={{color: 'var(--promptos-pink)'}}>For the prompts</div>
          <h2 style={{fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.05}}>
            Why our prompts work when free ones don&apos;t.
          </h2>
        </SectionFade>

        {PROMPT_PRINCIPLES.map((p) => (
          <SectionFade key={p.n} as="div" className="principle">
            <div className="num" aria-hidden>{p.n}</div>
            <h3>{p.title}</h3>
            {p.body.map((para) => <p key={para.slice(0, 30)}>{para}</p>)}
            <div className="pull-quote">{p.quote}</div>
          </SectionFade>
        ))}

        <SectionFade as="div" style={{marginTop: 96, paddingTop: 48, borderTop: '1px solid var(--hairline)'}}>
          <div className="section-eyebrow" style={{color: 'var(--promptos-pink)'}}>For the playbooks</div>
          <h2 style={{fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.05}}>
            Why our playbooks work when courses don&apos;t.
          </h2>
        </SectionFade>

        {PLAYBOOK_PRINCIPLES.map((p) => (
          <SectionFade key={p.n} as="div" className="principle">
            <div className="num" aria-hidden>{p.n}</div>
            <h3>{p.title}</h3>
            {p.body.map((para) => <p key={para.slice(0, 30)}>{para}</p>)}
            <div className="pull-quote">{p.quote}</div>
          </SectionFade>
        ))}

        <SectionFade as="div" style={{marginTop: 80, padding: '40px 0', borderTop: '1px solid var(--hairline)', textAlign: 'center'}}>
          <p style={{color: 'var(--fg-3)', marginBottom: 16}}>
            Authority products follow the same nine principles. The Personal Brand Playbook is reviewed by two operators currently building public audiences; the Content Engine Pack is held to the same prompt-quality bar; the High-Ticket Product Finder is read by buyers who&apos;ve actually launched the offer it walks through.
          </p>
          <p style={{color: 'var(--fg-3)'}}>
            More on why playbooks beat courses → <Link to="/why-promptos" className="text-link">why Promptos</Link>.
          </p>
        </SectionFade>
      </div>
      <NewsletterCTA />
    </main>
  );
}
