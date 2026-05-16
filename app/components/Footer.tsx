/**
 * Promptos footer v3 — five link columns (Packs / Guides / Company / Support /
 * Legal), brand column with social, payment chip row.
 *
 * Newsletter signup lives in its own NewsletterCTA section above the footer
 * so it gets the full-width gradient treatment.
 */

import {Link} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {Wordmark} from '~/components/promptos/Wordmark';
import {PACKS, GUIDES, AUTHORITY, BUNDLES} from '~/lib/catalog';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

const COMPANY_LINKS = [
  {label: 'About', to: '/about'},
  {label: 'Method', to: '/method'},
  {label: 'Why Us', to: '/why-promptos'},
  {label: 'Reviews', to: '/reviews'},
  {label: 'Updates', to: '/updates'},
];

// v3.3 — Support now includes the legal links (Legal column removed
// per the 5-column spec). FAQ anchor kept on homepage where the
// FaqV2 section actually lives.
const SUPPORT_LINKS = [
  {label: 'Contact', to: '/contact'},
  {label: 'FAQ', to: '/#faq'},
  {label: 'License', to: '/license'},
  {label: 'Refunds', to: '/refunds'},
  {label: 'Terms', to: '/legal/terms'},
  {label: 'Privacy', to: '/privacy'},
  {label: 'Cookies', to: '/legal/cookies'},
  {label: 'DMCA', to: '/legal/dmca'},
  {label: 'Acceptable Use', to: '/legal/acceptable-use'},
];

const TRUST_BADGES = [
  {icon: '📥', label: 'Instant download'},
  {icon: '✅', label: 'Confidence guarantee'},
  {icon: '🔒', label: 'Secure checkout'},
  {icon: '∞', label: 'Works with all LLMs'},
];

const PAYMENT_CHIPS = ['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE PAY', 'GOOGLE PAY', 'SHOP PAY'];

export function Footer(_props: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-v2 footer-v3">
      <div className="footer-trust-strip" aria-label="Trust indicators">
        <div className="footer-trust-strip-inner">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="footer-trust-badge">
              <span className="footer-trust-icon" aria-hidden>{b.icon}</span>
              <span className="footer-trust-label">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-v2-inner">
        <div className="footer-v2-top footer-v3-top">
          <div className="footer-v2-brand">
            <Wordmark color="#FAFAFA" width={150} />
            <p>
              Two product lines, one bar. Prompt packs for the work you do every
              day. Playbooks for the business you want to build.
            </p>
          </div>

          <div className="footer-v2-col">
            <details open>
              <summary><h6>Packs</h6></summary>
              <ul>
                {PACKS.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/packs/${p.slug}`} prefetch="intent">{p.name}</Link>
                  </li>
                ))}
                <li>
                  <Link to={`/bundles/packs`} prefetch="intent">
                    Packs Bundle, $99
                  </Link>
                </li>
              </ul>
            </details>
          </div>

          <div className="footer-v2-col">
            <details open>
              <summary><h6>Playbooks</h6></summary>
              <ul>
                {GUIDES.map((g) => (
                  <li key={g.slug}>
                    <Link to={`/guides/${g.slug}`} prefetch="intent">{g.name}</Link>
                  </li>
                ))}
                <li>
                  <Link to={`/bundles/guides`} prefetch="intent">
                    Guides Bundle, $497
                  </Link>
                </li>
              </ul>
            </details>
          </div>

          <div className="footer-v2-col">
            <details open>
              <summary><h6>Authority</h6></summary>
              <ul>
                {AUTHORITY.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/authority/${a.slug}`} prefetch="intent">{a.name}</Link>
                  </li>
                ))}
                <li>
                  <Link to={`/bundles/authority`} prefetch="intent">
                    Authority Bundle, $249
                  </Link>
                </li>
              </ul>
            </details>
          </div>

          <div className="footer-v2-col">
            <details open>
              <summary><h6>Company</h6></summary>
              <ul>
                {COMPANY_LINKS.map((l) => (
                  <li key={l.label}><Link to={l.to} prefetch="intent">{l.label}</Link></li>
                ))}
              </ul>
            </details>
          </div>

          <div className="footer-v2-col">
            <details open>
              <summary><h6>Support</h6></summary>
              <ul>
                {SUPPORT_LINKS.map((l) => (
                  <li key={l.label}><Link to={l.to} prefetch="intent">{l.label}</Link></li>
                ))}
              </ul>
            </details>
          </div>
        </div>

        <div className="divider" />

        <div className="footer-v2-bottom">
          <div className="footer-v2-bottom-lines">
            <p>© {year} Promptos. All rights reserved. Made by people who use it.</p>
            <p className="footer-currency-note">
              All prices in USD. Local taxes calculated at checkout where applicable.
            </p>
          </div>
          <div className="footer-v2-social" aria-label="Social links">
            <a href="https://x.com/promptos" aria-label="X / Twitter" rel="noreferrer" target="_blank">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://github.com/promptos" aria-label="GitHub" rel="noreferrer" target="_blank">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.78 0c2.21-1.5 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
              </svg>
            </a>
            <a href="https://promptos.substack.com" aria-label="Newsletter" rel="noreferrer" target="_blank">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 4h18v3H3zM3 11h18v3H3zM3 18l9 4 9-4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="https://youtube.com/@promptos" aria-label="YouTube" rel="noreferrer" target="_blank">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.76C18.16 5 12 5 12 5s-6.16 0-7.84.44A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.76C5.84 19 12 19 12 19s6.16 0 7.84-.44a2.5 2.5 0 0 0 1.76-1.76A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5 3-5 3Z" />
              </svg>
            </a>
          </div>
          <div className="pay">
            {PAYMENT_CHIPS.map((c) => (
              <span key={c} className="chip">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
