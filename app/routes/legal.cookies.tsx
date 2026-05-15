import type {Route} from './+types/legal.cookies';

export const meta: Route.MetaFunction = () => [
  {title: 'Cookie Policy · Promptos'},
  {
    name: 'description',
    content:
      'Which cookies promptos.store uses, what each one does, and how to control them.',
  },
];

const EFFECTIVE = 'May 14, 2026';
const PRIVACY = 'privacy@promptos.store';

export default function Cookies() {
  return (
    <main id="main" className="legal-page" data-page="legal-cookies">
      <div className="legal-page-inner">
        <p className="meta">Effective {EFFECTIVE}</p>
        <h1>Cookie Policy</h1>
        <p className="lede">
          We use a small set of cookies. The essential ones keep the site working. The analytics
          ones are aggregated and anonymized. We do not use cross-site advertising cookies or
          behavioural-targeting cookies.
        </p>

        <h2>1. What cookies are</h2>
        <p>
          A cookie is a small text file placed on your device by a website you visit. It lets the
          site remember things across pages (like what is in your cart) and helps us understand
          aggregated usage patterns (like which pages are most visited).
        </p>

        <h2>2. How we use cookies</h2>
        <ul>
          <li><strong>Essential.</strong> Required to operate the site, like maintaining your cart, your login session, and basic security.</li>
          <li><strong>Analytics.</strong> Aggregated, anonymized statistics: how many people visit each page, which countries they come from, which device class they use.</li>
          <li><strong>Marketing.</strong> We do not set first-party marketing cookies. If you opt in to our newsletter, that uses email only.</li>
        </ul>

        <h2>3. Specific cookies set</h2>
        <p>The cookies set when you visit promptos.store:</p>
        <ul>
          <li>
            <strong>cart</strong> (Shopify, essential). Stores the contents of your cart. Lifetime:
            session. First-party.
          </li>
          <li>
            <strong>_shopify_y / _shopify_s</strong> (Shopify, essential). Identifies your session
            for checkout. Lifetime: 1 year / session. First-party.
          </li>
          <li>
            <strong>secure_session_id</strong> (Shopify, essential). Keeps the checkout secure.
            Lifetime: session. First-party.
          </li>
          <li>
            <strong>localization</strong> (Shopify, essential). Stores your country and currency
            preference. Lifetime: 14 days. First-party.
          </li>
          <li>
            <strong>plausible_ignore</strong> (analytics, optional). Set if you opt out of our
            anonymous analytics. Lifetime: persistent. First-party.
          </li>
          <li>
            <strong>promptos-whats-new-banner-dismissed-v1</strong> (UI, essential). Remembers if
            you dismissed the top banner. Lifetime: persistent. First-party (localStorage).
          </li>
          <li>
            <strong>promptos-exit-intent-dismissed-v1</strong> (UI, essential). Remembers if you
            dismissed the exit-intent modal. Lifetime: persistent. First-party (localStorage).
          </li>
        </ul>

        <h2>4. Third-party cookies</h2>
        <p>
          When you complete a purchase, Shopify checkout may set additional cookies under their
          domain to process payment. These are covered by{' '}
          <a href="https://www.shopify.com/legal/cookies" rel="noreferrer" target="_blank">
            Shopify&apos;s cookie policy
          </a>. Our payment processors (Stripe, PayPal, Apple Pay, Google Pay, Shop Pay) may set
          cookies on their domains during checkout.
        </p>

        <h2>5. How to manage cookies</h2>
        <p>You can manage cookies in your browser settings:</p>
        <ul>
          <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
          <li>Safari: Preferences → Privacy → Manage Website Data</li>
          <li>Firefox: Preferences → Privacy &amp; Security → Cookies and Site Data</li>
          <li>Edge: Settings → Cookies and site permissions → Cookies and site data</li>
        </ul>
        <p>
          Note: blocking essential cookies will break checkout and cart functionality. We rely on
          them to deliver your purchase. Analytics cookies are optional and disabling them does not
          affect site functionality.
        </p>

        <h2>6. Changes to this Policy</h2>
        <p>
          We may update this Cookie Policy when our cookie usage changes. Material changes will be
          posted on this page with a new effective date.
        </p>

        <h2>7. Contact</h2>
        <p>
          Questions about cookies or tracking? Email{' '}
          <a href={`mailto:${PRIVACY}`}>{PRIVACY}</a>.
        </p>
      </div>
    </main>
  );
}
