import {SectionFade} from './SectionFade';
import {JsonLd, faqSchema} from './JsonLd';

export const FAQS = [
  {
    q: "What's actually in a pack?",
    a: 'An editable .docx and a polished PDF. Each pack has 55–75 prompts organized into six working sections. Every prompt has a title, a use case, a copy-pasteable body with bracketed variables, an example output, and a one-line pro tip.',
  },
  {
    q: 'Which AI models do these work with?',
    a: "Every major LLM. The prompts are built around structure and clear instruction, not model-specific tricks. They work with Claude, ChatGPT, Gemini, Grok, Perplexity, and whatever ships next. We don't pin to specific version numbers because the landscape moves every month, and the prompts are written to outlast any one of them. If a model can read a prompt with bullet points and follow a brief, it can run these.",
  },
  {
    q: 'Can I use these for client work?',
    a: 'Yes. Promptos is licensed for personal and client work. You can adapt prompts, ship them inside your own templates, and keep using them after a job ends. You just can\'t resell the pack itself or republish the file.',
  },
  {
    q: 'What format are the packs?',
    a: 'Editable .docx + a polished PDF mirror. Select packs (Productivity, AI Power User) also include a Notion template version.',
  },
  {
    q: 'Do I get updates?',
    a: "Every pack gets new prompts added quarterly. You'll get every future version of the packs you bought, free, for as long as Promptos exists. We publish a changelog at /updates.",
  },
  {
    q: "What's your refund policy?",
    a: "If a pack isn't useful in your first 30 days, write us one sentence and we'll refund you. No screenshots, no exit interview. We'd rather lose a sale than keep a frustrated customer.",
  },
  {
    q: 'Why are these better than free prompts (or expensive courses)?',
    a: "Free prompts give you about 20% of the job. The other 80% is craft. Knowing when to add a constraint, when to ask for variants, when to red-team the output. Promptos packages that craft into prompts that come with examples, pro tips, and bracketed variables you fill in. The other end of the market is courses and mentorships at $2,000 to $10,000+ that overpromise, underdeliver, and upsell you to the next tier forever. Promptos sits between them: structured, foolproof frameworks at a fraction of the cost, with no upsells and no fluff. Pay once. Ship faster.",
  },
  {
    q: 'Who are you?',
    a: "Nathan, the founder. Was a marketing lead at a B2B SaaS, then a freelancer, then a maker of Promptos. The packs started as my private Google Doc; they're better now because they had to be.",
  },
];

export function FaqV2() {
  return (
    <section className="faq-v2" id="faq">
      <JsonLd data={faqSchema(FAQS)} />
      <div className="faq-v2-inner">
        <SectionFade as="h2">Questions, answered.</SectionFade>
        <div className="accordion">
          {FAQS.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>
                {item.q}
                <span className="ic" aria-hidden>
                  <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                    <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
