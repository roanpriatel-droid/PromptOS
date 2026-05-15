import type {Route} from './+types/license';

export const meta: Route.MetaFunction = () => [
  {title: 'License Agreement · Promptos'},
  {
    name: 'description',
    content:
      'The Promptos License Agreement. What you can do with the products, what you cannot, and how we protect our intellectual property.',
  },
];

const EFFECTIVE = 'May 14, 2026';
const SUPPORT = 'support@promptos.store';

export default function License() {
  return (
    <main id="main" className="legal-page" data-page="legal-license">
      <div className="legal-page-inner">
        <p className="meta">Effective {EFFECTIVE} · License v1.1</p>
        <h1>License Agreement</h1>
        <p className="lede">
          When you buy a Promptos product, you are buying a license to use it in your work and
          your clients&apos; work. You are not buying the right to resell, redistribute, share, or
          republish the product. This page sets out the full terms.
        </p>

        <h2>1. License Grant</h2>
        <p>
          Subject to your full payment and ongoing compliance with this License, Promptos grants
          you a limited, non-exclusive, non-transferable, revocable license to:
        </p>
        <ul>
          <li>Use the product for personal purposes;</li>
          <li>Use the product for client work, subject to the restrictions below;</li>
          <li>Modify the product (text, templates, prompts) for your own personal or client use;</li>
          <li>Generate outputs using the prompts. The outputs you generate belong to you, subject to the model provider&apos;s terms.</li>
        </ul>

        <h2>2. What You Can Do</h2>
        <ul>
          <li>Use prompts in your daily work, on any number of personal projects, forever.</li>
          <li>Apply playbook frameworks to your business and your clients&apos; businesses.</li>
          <li>Modify text and templates for your own use or to fit a specific client engagement.</li>
          <li>Use prompts to generate client deliverables (e.g. ad copy, code reviews, briefs).</li>
          <li>
            Reference Promptos products in your work (for example, &ldquo;I use Promptos prompt
            packs in my workflow&rdquo;).
          </li>
          <li>Take screenshots of single prompts or chapters for social-media posts, with attribution.</li>
        </ul>

        <h2>3. What You Cannot Do</h2>
        <p>This is the critical section. Violations end the license immediately.</p>
        <ul>
          <li><strong>Resell, redistribute, or share the product</strong> in any form, in whole or in part, free or paid.</li>
          <li>Share login credentials or download links with anyone who has not purchased the product.</li>
          <li>
            Upload Promptos products to file-sharing sites, Google Drive folders shared publicly,
            public GitHub repositories, Discord/Slack channels, &ldquo;resource swap&rdquo;
            communities, or any platform where they can be accessed by people who have not bought
            them.
          </li>
          <li>Repackage Promptos content as your own product, course, or template kit.</li>
          <li>Use Promptos products as training data for AI models that you resell or distribute.</li>
          <li>
            Sublicense the products to clients. Your client work uses the product. The client does
            not receive the product itself.
          </li>
          <li>Remove Promptos branding, watermarks, or copyright notices from the products.</li>
          <li>Claim authorship of Promptos content.</li>
          <li>Translate and distribute the products. Translation rights are reserved.</li>
        </ul>

        <h2>4. Watermarking and Monitoring</h2>
        <p>
          All Promptos products are individually watermarked with the buyer&apos;s unique purchase
          identifier upon delivery. Promptos uses automated monitoring systems to detect
          unauthorized distribution, resale, or sharing of our products across the web, social
          media, online marketplaces, and file-sharing platforms. These systems flag potential
          violations for human review.
        </p>
        <p>
          Confirmed cases of unauthorized distribution will be pursued via: (i) DMCA takedown
          notices, (ii) account termination across all Promptos products (no further purchases
          permitted), (iii) full refund reversal of any prior purchases, and (iv) civil action for
          damages, including statutory damages, attorney&apos;s fees, and lost revenue. Each
          Promptos product represents significant creative and operational investment, and we
          protect that investment vigorously.
        </p>

        <h2>5. If You Are an Agency</h2>
        <p>
          Buying a product covers everyone at your agency using it in client work. If 12
          contractors use the same prompt pack to deliver client work, that is fine, one license
          per pack still works. The license does not extend to the clients themselves: they
          receive your deliverables, not the prompt pack.
        </p>

        <h2>6. If You Are a Teacher or Course Creator</h2>
        <p>
          You can reference Promptos products in lessons and link buyers to promptos.store. You
          cannot bundle a Promptos product into a paid course or workshop as the course material.
          Write to us at <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> with subject line
          &ldquo;Educational sublicense&rdquo; and we will set up a fair sublicense if it fits.
        </p>

        <h2>7. Enforcement</h2>
        <p>
          Promptos reserves all rights to enforce this License through any legal means available,
          including DMCA notices, account termination, civil action, and injunctive relief.
        </p>

        <h2>8. Term and Termination</h2>
        <p>
          The license granted is perpetual unless terminated for breach. Material breach
          (especially Section 3 violations) results in immediate termination of the license. Upon
          termination, you must destroy all copies of the product in your possession. Sections 3,
          4, 7, and 9 survive termination.
        </p>

        <h2>9. Survival</h2>
        <p>
          The restrictions in Section 3 and the enforcement provisions in Sections 4 and 7 survive
          any termination of this License.
        </p>

        <h2>10. Edge Cases</h2>
        <p>
          If you are not sure whether a specific use case is OK, just ask. Email{' '}
          <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> with a one-sentence description and we will
          reply within one business day.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          This License is governed by the same governing law as the Promptos{' '}
          <a href="/legal/terms">Terms of Service</a>.
        </p>
      </div>
    </main>
  );
}
