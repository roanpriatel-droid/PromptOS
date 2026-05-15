import {SectionFade} from './SectionFade';

const ITEMS = [
  {
    title: 'Editable .docx',
    body: 'Open in Word, Google Docs, or any editor that handles docx. Fork it, brand it, tune it.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M14 3v6h6M8 14h8M8 18h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Polished PDF',
    body: 'A typeset, page-broken PDF mirror, the version you keep on the desktop.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M6 3h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <text x="12" y="18" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="6" fill="currentColor">PDF</text>
      </svg>
    ),
  },
  {
    title: 'Notion template',
    body: 'Select packs ship with a Notion mirror so you can drop prompts into your workspace.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 8v8M8 8l8 8M16 8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Lifetime updates',
    body: 'Every future version of the packs you bought, free, as long as Promptos exists.',
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
