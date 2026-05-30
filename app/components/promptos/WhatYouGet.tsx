import {SectionFade} from './SectionFade';

// v3.8a Phase 4G — reframed from deliverable list to value props.
// Title labels the deliverable; body frames the buyer benefit.
const ITEMS = [
  {
    title: 'Editable .docx + PDF',
    body: 'Fork it for your clients. License includes commercial use.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M14 3v6h6M8 14h8M8 18h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Polished PDF mirror',
    body: 'The version that lives on your desktop. Type-set, page-broken, looks like a book.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M6 3h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <text x="12" y="18" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="6" fill="currentColor">PDF</text>
      </svg>
    ),
  },
  {
    title: 'Notion template (select packs)',
    body: 'Drop prompts into your workspace. No reformatting.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 8v8M8 8l8 8M16 8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Lifetime updates',
    body: 'Every future version of this pack, free, forever. Most packs gain 10-15 prompts per year.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M20 12a8 8 0 1 1-3-6.24M20 4v5h-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function WhatYouGet() {
  return (
    <section className="whatget">
      <div className="whatget-inner">
        <SectionFade as="h2">What you get when you buy.</SectionFade>
        <div className="whatget-grid">
          {ITEMS.map((item, i) => (
            <SectionFade key={item.title} as="div" className="whatget-card" delayMs={i * 80}>
              <div className="ico">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}
