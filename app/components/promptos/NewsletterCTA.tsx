import {SectionFade} from './SectionFade';

export function NewsletterCTA() {
  return (
    <section className="newsletter-cta">
      <SectionFade as="div" className="newsletter-inner">
        <div className="section-eyebrow">Newsletter</div>
        <h2>One free prompt. Every Tuesday.</h2>
        <p>Real prompts from upcoming packs. No spam. Unsubscribe anytime.</p>
        <form
          className="newsletter-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input type="email" placeholder="you@work.com" aria-label="Email address" required />
          <button type="submit">
            Subscribe
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
              <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </SectionFade>
    </section>
  );
}
