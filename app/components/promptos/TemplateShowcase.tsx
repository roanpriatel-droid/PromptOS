import {SectionFade} from './SectionFade';
import type {Guide} from '~/lib/catalog';

const ICONS = [
  // doc
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" key="doc">
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z M14 3v6h6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>,
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" key="mail">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>,
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" key="grid">
    <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
  </svg>,
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" key="bag">
    <path d="M5 8h14l-1 12H6L5 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>,
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" key="check">
    <path d="m3 12 4 4 14-14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" key="lines">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>,
];

export function TemplateShowcase({guide}: {guide: Guide}) {
  return (
    <section className="templates">
      <div className="templates-inner">
        <SectionFade as="div" className="templates-head">
          <div className="section-eyebrow">Templates included</div>
          <h2>{guide.templates.length} templates you can use Monday.</h2>
          <p>
            Every playbook ships with copy-paste templates, scripts, contracts, sequences, calculators.
            All editable, all yours.
          </p>
        </SectionFade>
        <div className="templates-grid">
          {guide.templates.map((t, i) => (
            <SectionFade key={t.name} as="div" className="template-card" delayMs={i * 40}>
              <div className="ico">{ICONS[i % ICONS.length]}</div>
              <h4>{t.name}</h4>
              <p>{t.description}</p>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  );
}
