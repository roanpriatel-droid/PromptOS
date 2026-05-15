import type {Route} from './+types/legal.acceptable-use';

export const meta: Route.MetaFunction = () => [
  {title: 'Acceptable Use Policy · Promptos'},
  {
    name: 'description',
    content:
      'The rules for using promptos.store responsibly. What is prohibited, expected user conduct, and consequences.',
  },
];

const EFFECTIVE = 'May 14, 2026';
const SUPPORT = 'support@promptos.store';

export default function AcceptableUse() {
  return (
    <main id="main" className="legal-page" data-page="legal-acceptable-use">
      <div className="legal-page-inner">
        <p className="meta">Effective {EFFECTIVE}</p>
        <h1>Acceptable Use Policy</h1>
        <p className="lede">
          This Policy describes the rules for using promptos.store. The site exists to deliver
          products and information to legitimate buyers. Activity that interferes with that purpose
          is prohibited.
        </p>

        <h2>1. Prohibited Activities</h2>
        <p>You may not:</p>
        <ul>
          <li>Scrape or harvest content, prices, or reviews from the site (use the public RSS feeds and product pages instead).</li>
          <li>Use bots, crawlers, or automated tools that exceed reasonable rate limits, or that bypass robots.txt directives.</li>
          <li>Attempt to access non-public areas of the site, accounts other than your own, or any backend infrastructure.</li>
          <li>Probe, scan, or test the vulnerability of the site, or breach security or authentication measures.</li>
          <li>Interfere with the proper functioning of the site (denial-of-service attacks, flooding, etc.).</li>
          <li>Submit fraudulent orders, use stolen payment methods, or commit chargeback fraud.</li>
          <li>Submit fake reviews, manipulate ratings, or impersonate other buyers.</li>
          <li>Use the site or Promptos products to violate any applicable law or regulation.</li>
          <li>Use the site to harass, threaten, defame, or harm any person.</li>
          <li>Engage in any activity prohibited by the <a href="/license">License Agreement</a>.</li>
        </ul>

        <h2>2. User Conduct Expectations</h2>
        <p>When interacting with Promptos (support emails, reviews, social media):</p>
        <ul>
          <li>Be honest. Don&apos;t misrepresent yourself or your situation.</li>
          <li>Be respectful. Our support team will mirror your tone, and we&apos;d both rather be helpful than combative.</li>
          <li>Keep reviews on the product. Reviews should describe your experience with the product, not unrelated grievances.</li>
        </ul>

        <h2>3. Reporting Violations</h2>
        <p>
          If you observe activity that violates this Policy, email{' '}
          <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> with subject line &ldquo;Abuse report&rdquo;.
          Include enough detail (URLs, screenshots, account identifiers) for us to investigate.
        </p>

        <h2>4. Consequences of Violations</h2>
        <p>Depending on severity, violations of this Policy may result in:</p>
        <ul>
          <li>A warning and request to stop the prohibited activity;</li>
          <li>Rate-limiting or temporary suspension of access;</li>
          <li>Permanent termination of your Promptos account and license to all products;</li>
          <li>Reporting to relevant authorities, payment processors, or hosting providers;</li>
          <li>Civil or criminal action where warranted.</li>
        </ul>

        <h2>5. Changes</h2>
        <p>
          We may update this Policy from time to time. Material changes will be posted here with a
          revised effective date.
        </p>
      </div>
    </main>
  );
}
