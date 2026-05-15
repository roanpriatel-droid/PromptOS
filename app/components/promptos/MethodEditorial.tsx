import {SectionFade} from './SectionFade';

const PRINCIPLES = [
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
      'Every prompt is run against Claude, ChatGPT, and Gemini. Twenty real uses each. If it doesn\'t survive on any of the three models, it gets a tuning note, or it gets cut.',
      'That bar quietly throws out most "100 ChatGPT prompts" lists you\'ve seen.',
    ],
    quote: '"Survives twenty real uses or it doesn\'t ship."',
  },
  {
    n: '3',
    title: 'Specific over clever.',
    body: [
      'The best prompts read like a brief, not like a magic spell. We write them the way a senior person would write a request to a junior person, clear, opinionated, concrete.',
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

export function MethodEditorial() {
  return (
    <section className="method-editorial">
      <div className="method-editorial-inner">
        <SectionFade as="div">
          <div className="eyebrow section-eyebrow">The method</div>
          <h2>Why these prompts work when free ones don&apos;t.</h2>
          <p className="drop-cap" style={{
            fontSize: 19,
            lineHeight: 1.7,
            color: 'var(--ink-soft)',
            marginTop: 16,
          }}>
            Free prompts work for the easy 20% of the job, the part nobody
            charges for. The rest is craft: knowing when to add a constraint,
            when to ask for variants, when to red-team the model&apos;s own
            output. Promptos is that craft, packaged. Five principles, five
            sections, read them like a manifesto, then test them on the
            packs.
          </p>
        </SectionFade>

        {PRINCIPLES.map((p) => (
          <SectionFade key={p.n} as="div" className="principle">
            <div className="num" aria-hidden>{p.n}</div>
            <h3>{p.title}</h3>
            {p.body.map((para) => (
              <p key={para.slice(0, 30)}>{para}</p>
            ))}
            <div className="pull-quote">{p.quote}</div>
          </SectionFade>
        ))}
      </div>
    </section>
  );
}
