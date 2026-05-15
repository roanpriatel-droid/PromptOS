import type {Route} from './+types/legal.dmca';

export const meta: Route.MetaFunction = () => [
  {title: 'DMCA Policy · Promptos'},
  {
    name: 'description',
    content:
      'How to file a DMCA takedown notice for Promptos content, and our designated DMCA agent.',
  },
];

const EFFECTIVE = 'May 14, 2026';
const DMCA_EMAIL = 'dmca@promptos.store';

export default function DMCAPolicy() {
  return (
    <main id="main" className="legal-page" data-page="legal-dmca">
      <div className="legal-page-inner">
        <p className="meta">Effective {EFFECTIVE}</p>
        <h1>DMCA Policy</h1>
        <p className="lede">
          Promptos respects the intellectual-property rights of others and expects users to do the
          same. This policy explains how to file a DMCA takedown notice for Promptos content found
          on third-party sites, how to file a counter-notification, and our repeat-infringer
          policy.
        </p>

        <h2>1. Filing a DMCA Takedown Notice</h2>
        <p>
          If you believe a Promptos product (or your own copyrighted work) has been used in a way
          that constitutes copyright infringement, you may submit a takedown notice. To be
          effective, the notice must include all of the following:
        </p>
        <ol>
          <li>A physical or electronic signature of the copyright owner or authorized agent.</li>
          <li>
            Identification of the copyrighted work claimed to have been infringed (e.g.,
            &ldquo;The Marketer&apos;s Pack, Promptos product purchased {EFFECTIVE}, watermarked
            with purchase ID xxx&rdquo;).
          </li>
          <li>
            Identification of the allegedly infringing material and information reasonably
            sufficient to locate it (URL, file path, or screenshot).
          </li>
          <li>
            Your contact information, including name, mailing address, telephone number, and email
            address.
          </li>
          <li>
            A statement that you have a good-faith belief that the use is not authorized by the
            copyright owner, its agent, or the law.
          </li>
          <li>
            A statement, made under penalty of perjury, that the information in the notice is
            accurate and that you are the copyright owner or authorized to act on behalf of the
            copyright owner.
          </li>
        </ol>

        <h2>2. Where to Send the Notice</h2>
        <p>Send your DMCA takedown notice to our designated agent:</p>
        <p style={{padding: 18, background: 'var(--cream)', borderRadius: 12, fontFamily: 'var(--font-mono)', fontSize: 14}}>
          Promptos &mdash; DMCA Agent<br />
          Email: <a href={`mailto:${DMCA_EMAIL}`}>{DMCA_EMAIL}</a><br />
          Subject line: &ldquo;DMCA Takedown Notice&rdquo;
        </p>
        <p>We review and act on valid notices within 5 business days.</p>

        <h2>3. Counter-Notification</h2>
        <p>
          If you believe a takedown notice was filed in error against content you posted, you may
          submit a counter-notification including:
        </p>
        <ol>
          <li>Your physical or electronic signature.</li>
          <li>
            Identification of the material that was removed and the location where it appeared
            before removal.
          </li>
          <li>
            A statement under penalty of perjury that you have a good-faith belief that the
            material was removed as a result of mistake or misidentification.
          </li>
          <li>
            Your name, address, telephone number, and a statement consenting to the jurisdiction of
            the federal court for the judicial district in which your address is located, or, if
            outside the United States, any judicial district in which Promptos may be found.
          </li>
        </ol>

        <h2>4. Repeat Infringer Policy</h2>
        <p>
          It is Promptos&apos;s policy to terminate the accounts of repeat infringers in
          appropriate circumstances. Three confirmed instances of infringement related to a single
          account or buyer identifier will result in permanent account termination across all
          Promptos products, no further purchases permitted, and referral of the matter for civil
          action where warranted.
        </p>

        <h2>5. Misrepresentation</h2>
        <p>
          Submitting a knowingly false DMCA notice or counter-notification may result in liability
          for damages, including costs and attorney&apos;s fees, under 17 U.S.C. § 512(f).
        </p>

        <h2>6. Designated Agent</h2>
        <p>
          Our DMCA designated agent for notice of claims of infringement is reachable at{' '}
          <a href={`mailto:${DMCA_EMAIL}`}>{DMCA_EMAIL}</a>. We will respond to valid notices within five
          business days.
        </p>
      </div>
    </main>
  );
}
