import {useState} from 'react';
import type {Route} from './+types/contact';
import {SectionFade} from '~/components/promptos/SectionFade';

export const meta: Route.MetaFunction = () => [
  {title: 'Contact · Promptos'},
  {
    name: 'description',
    content:
      'Question about a pack, a refund, or a license? One sentence, one human, one inbox.',
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <main id="main" className="editorial-page page is-active" data-page="contact">
      <div className="editorial-inner">
        <SectionFade as="div">
          <div className="eyebrow section-eyebrow">Contact</div>
          <h1>One sentence. <em>One human.</em></h1>
          <p className="lede">
            Question about a pack, a refund, or a license? Pop a note in below.
            We answer within 24 hours on weekdays, usually faster. Nathan reads
            every one.
          </p>
        </SectionFade>

        {sent ? (
          <SectionFade as="div" style={{textAlign: 'center', padding: '60px 0'}}>
            <div
              style={{
                width: 64,
                height: 64,
                margin: '0 auto 24px',
                borderRadius: 999,
                background: 'var(--grad-pp)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-hidden
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                <path d="m5 12 5 5L20 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: 32, letterSpacing: '-0.02em'}}>
              Got it. We&apos;ll reply within a day.
            </h2>
            <p style={{marginTop: 12}}>If you don&apos;t hear back, ping <a className="text-link" href="mailto:hi@promptos.co">hi@promptos.co</a> directly.</p>
          </SectionFade>
        ) : (
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="contact-field">
              <input type="text" id="name" placeholder=" " required />
              <label htmlFor="name">Name</label>
            </div>
            <div className="contact-field">
              <input type="email" id="email" placeholder=" " required />
              <label htmlFor="email">Email</label>
            </div>
            <div className="contact-field">
              <select id="subject" defaultValue="" required onChange={(e) => {
                const el = e.currentTarget.parentElement;
                if (el) el.classList.toggle('has-value', !!e.currentTarget.value);
              }}>
                <option value="" disabled hidden> </option>
                <option value="pack">Question about a pack</option>
                <option value="refund">Refund</option>
                <option value="license">License / client work</option>
                <option value="press">Press</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="subject">Subject</label>
            </div>
            <div className="contact-field">
              <textarea id="message" placeholder=" " required />
              <label htmlFor="message">Message</label>
            </div>
            <button type="submit" className="contact-submit">
              Send <span aria-hidden>→</span>
            </button>
            <p style={{fontSize: 13, color: 'var(--fg-3)', textAlign: 'center'}}>
              Or email <a className="text-link" href="mailto:hi@promptos.co">hi@promptos.co</a> directly. Response within 24h on weekdays.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
