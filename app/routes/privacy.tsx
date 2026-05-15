import type {Route} from './+types/privacy';

export const meta: Route.MetaFunction = () => [
  {title: 'Privacy Policy · Promptos'},
  {
    name: 'description',
    content:
      'The Promptos Privacy Policy. GDPR and CCPA compliant. We collect what we need to deliver your product and nothing more.',
  },
];

const EFFECTIVE = 'May 14, 2026';
const SUPPORT = 'support@promptos.store';
const PRIVACY = 'privacy@promptos.store';

export default function Privacy() {
  return (
    <main id="main" className="legal-page" data-page="legal-privacy">
      <div className="legal-page-inner">
        <p className="meta">Effective {EFFECTIVE} · Last updated {EFFECTIVE}</p>
        <h1>Privacy Policy</h1>
        <p className="lede">
          We collect the minimum information needed to deliver your products and run a working
          business. We do not sell your data, and we do not track you across the web. This policy
          explains what we collect, why, how long we keep it, and the rights you have under GDPR
          and CCPA.
        </p>

        <nav aria-label="Table of contents" className="legal-toc">
          <h2>On this page</h2>
          <ol>
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#collect">Information We Collect</a></li>
            <li><a href="#use">How We Use Information</a></li>
            <li><a href="#gdpr-basis">Legal Basis (GDPR)</a></li>
            <li><a href="#sharing">Sharing and Disclosure</a></li>
            <li><a href="#retention">Data Retention</a></li>
            <li><a href="#rights-gdpr">Your Rights (GDPR)</a></li>
            <li><a href="#rights-ccpa">Your Rights (CCPA)</a></li>
            <li><a href="#transfers">International Data Transfers</a></li>
            <li><a href="#children">Children&apos;s Privacy</a></li>
            <li><a href="#security">Security</a></li>
            <li><a href="#cookies">Cookies and Tracking</a></li>
            <li><a href="#third-party">Third-Party Links</a></li>
            <li><a href="#changes">Changes to This Policy</a></li>
            <li><a href="#contact">Contact</a></li>
          </ol>
        </nav>

        <h2 id="intro">1. Introduction</h2>
        <p>
          Promptos is an independent digital products company. This Privacy Policy describes how we
          collect, use, store, and share personal information when you visit promptos.store,
          purchase a product, or contact us. By using the website or buying a product, you accept
          this Policy.
        </p>

        <h2 id="collect">2. Information We Collect</h2>

        <h3>Information you provide directly</h3>
        <ul>
          <li>
            <strong>Order information.</strong> Name, email address, billing address, and payment
            information. Payment information is processed by Shopify Payments, Stripe, PayPal,
            Apple Pay, Google Pay, or Shop Pay. We do not store full card numbers on our servers.
          </li>
          <li>
            <strong>Account information.</strong> If you create an account, we store your email
            and a hashed password.
          </li>
          <li>
            <strong>Communication.</strong> Email content and metadata when you contact support or
            reply to a newsletter.
          </li>
          <li>
            <strong>Newsletter signups.</strong> Email address only.
          </li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Server logs.</strong> IP address, user-agent string, requested URL, timestamp,
            referring URL. Retained for 30 days for security and abuse detection.
          </li>
          <li>
            <strong>Analytics.</strong> Aggregated, anonymized usage data (pageviews, country-level
            geography, device class) via a privacy-respecting analytics provider. No cross-site
            tracking, no persistent fingerprinting.
          </li>
          <li>
            <strong>Cookies.</strong> See <a href="/legal/cookies">Cookie Policy</a> for the full
            list.
          </li>
        </ul>

        <h2 id="use">3. How We Use Information</h2>
        <ul>
          <li><strong>Order fulfillment.</strong> Deliver products, send receipts, handle refunds.</li>
          <li><strong>Customer support.</strong> Respond to your messages and resolve issues.</li>
          <li><strong>Product updates.</strong> Notify you when a product you bought is updated (you can opt out).</li>
          <li><strong>Newsletter.</strong> Send the Tuesday email if you opted in.</li>
          <li><strong>Marketing.</strong> Only with opt-in. You can unsubscribe at any time.</li>
          <li><strong>Security and fraud prevention.</strong> Detect and prevent abuse of the service.</li>
          <li><strong>Legal compliance.</strong> Meet tax, accounting, and other legal obligations.</li>
        </ul>

        <h2 id="gdpr-basis">4. Legal Basis for Processing (GDPR)</h2>
        <p>For visitors in the European Economic Area and the UK, we rely on the following lawful bases:</p>
        <ul>
          <li><strong>Contract performance.</strong> To deliver the products you purchased.</li>
          <li><strong>Legitimate interest.</strong> Operating a working business, including limited analytics, security, and fraud prevention.</li>
          <li><strong>Consent.</strong> Marketing emails and non-essential cookies, where you have opted in.</li>
          <li><strong>Legal obligation.</strong> Tax records, accounting, responding to lawful requests.</li>
        </ul>

        <h2 id="sharing">5. Sharing and Disclosure</h2>
        <p>We share information only as needed and only with the categories of recipients below.</p>

        <h3>Service providers</h3>
        <ul>
          <li><strong>Shopify.</strong> E-commerce platform, order processing, payment intake.</li>
          <li><strong>Cloudflare / Oxygen.</strong> Hosting and content delivery.</li>
          <li><strong>Email service provider.</strong> Transactional and newsletter email delivery.</li>
          <li><strong>Analytics provider.</strong> Aggregated, anonymized usage statistics.</li>
        </ul>
        <p>Each service provider is contractually required to protect your information.</p>

        <h3>Legal requirements</h3>
        <p>
          We may disclose information when required by law, valid legal process, or to protect the
          rights, property, or safety of Promptos, our customers, or others.
        </p>

        <h3>Business transfers</h3>
        <p>
          If Promptos is acquired or merged, your information may be transferred to the successor
          entity, subject to the same protections set out in this Policy.
        </p>

        <h3>With your consent</h3>
        <p>For any sharing outside the above categories, we will ask you first.</p>

        <h2 id="retention">6. Data Retention</h2>
        <ul>
          <li><strong>Order records.</strong> Retained for 7 years to meet tax and accounting obligations.</li>
          <li><strong>Account data.</strong> Retained while your account is active. Deleted within 30 days of account closure request.</li>
          <li><strong>Server logs.</strong> 30 days.</li>
          <li><strong>Newsletter list.</strong> Until you unsubscribe.</li>
        </ul>

        <h2 id="rights-gdpr">7. Your Rights (GDPR)</h2>
        <p>If you are in the European Economic Area or UK, you have the right to:</p>
        <ul>
          <li><strong>Access.</strong> Request a copy of the personal information we hold about you.</li>
          <li><strong>Rectification.</strong> Ask us to correct inaccurate information.</li>
          <li><strong>Erasure.</strong> Ask us to delete your personal information (subject to legal retention requirements).</li>
          <li><strong>Restriction.</strong> Ask us to limit how we use your information.</li>
          <li><strong>Portability.</strong> Receive your information in a structured, machine-readable format.</li>
          <li><strong>Objection.</strong> Object to processing based on legitimate interest.</li>
          <li><strong>Withdraw consent.</strong> Where processing is based on consent, withdraw at any time.</li>
          <li><strong>Complain to a supervisory authority.</strong> You may also lodge a complaint with your local data protection authority.</li>
        </ul>
        <p>
          To exercise any of these rights, email <a href={`mailto:${PRIVACY}`}>{PRIVACY}</a>. We
          respond within 30 days.
        </p>

        <h2 id="rights-ccpa">8. Your Rights (CCPA)</h2>
        <p>If you are a California resident, you have the right to:</p>
        <ul>
          <li><strong>Know.</strong> Request the categories and specific pieces of personal information we have collected.</li>
          <li><strong>Delete.</strong> Request deletion of your personal information.</li>
          <li><strong>Opt-out of sale.</strong> Promptos does not sell your personal information, so this right is automatically respected.</li>
          <li><strong>Non-discrimination.</strong> We will not discriminate against you for exercising your rights.</li>
        </ul>
        <p>To exercise these rights, email <a href={`mailto:${PRIVACY}`}>{PRIVACY}</a>.</p>

        <h2 id="transfers">9. International Data Transfers</h2>
        <p>
          Personal information may be transferred to and processed in countries other than your
          own. When we transfer EU/UK personal data outside of those jurisdictions, we rely on
          appropriate safeguards including Standard Contractual Clauses.
        </p>

        <h2 id="children">10. Children&apos;s Privacy</h2>
        <p>
          Promptos is intended for users aged 16 and over. We do not knowingly collect personal
          information from anyone under 16. If you believe a child has provided us with personal
          information, contact us at <a href={`mailto:${PRIVACY}`}>{PRIVACY}</a> and we will
          delete it.
        </p>

        <h2 id="security">11. Security</h2>
        <p>
          We use industry-standard security measures including HTTPS, encrypted storage,
          principle-of-least-privilege access controls, and regular security reviews. No system is
          perfectly secure; we will notify affected users of any breach as required by applicable
          law.
        </p>

        <h2 id="cookies">12. Cookies and Tracking</h2>
        <p>
          We use a small number of essential and analytics cookies. We do not use cross-site
          advertising or behavioural-targeting cookies. See the <a href="/legal/cookies">Cookie Policy</a>{' '}
          for the full list and how to manage your preferences.
        </p>

        <h2 id="third-party">13. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party sites (such as Shopify checkout, model
          providers, or external articles). This Policy does not apply to those sites. Review the
          privacy policies of any third-party site you visit.
        </p>

        <h2 id="changes">14. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes will be announced
          via email to active customers and posted on this page with a revised effective date.
        </p>

        <h2 id="contact">15. Contact</h2>
        <p>
          For privacy questions or to exercise your rights, email{' '}
          <a href={`mailto:${PRIVACY}`}>{PRIVACY}</a>. For all other support requests, email{' '}
          <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>.
        </p>
      </div>
    </main>
  );
}
