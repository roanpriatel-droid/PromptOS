import type {Route} from './+types/legal.terms';

export const meta: Route.MetaFunction = () => [
  {title: 'Terms of Service · Promptos'},
  {
    name: 'description',
    content:
      'The Promptos Terms of Service. Plain-English where possible, with proper legal structure.',
  },
];

const EFFECTIVE = 'May 14, 2026';
const SUPPORT = 'support@promptos.store';

export default function Terms() {
  return (
    <main id="main" className="legal-page" data-page="legal-terms">
      <div className="legal-page-inner">
        <p className="meta">Effective {EFFECTIVE} · Last updated {EFFECTIVE}</p>
        <h1>Terms of Service</h1>
        <p className="lede">
          These Terms govern your access to and use of Promptos products and the promptos.store
          website. Read them before you buy. By purchasing a Promptos product or using the site, you
          agree to be bound by these Terms.
        </p>

        <div className="legal-note">
          <strong>Plain-English summary, not a substitute for the legal text below.</strong> The
          headline rules: you buy a license to use Promptos products in your work; you cannot
          redistribute or resell them; we cap our liability at the price you paid for the product.
          The rest is detail.
        </div>

        <nav aria-label="Table of contents" className="legal-toc">
          <h2>On this page</h2>
          <ol>
            <li><a href="#acceptance">Acceptance of Terms</a></li>
            <li><a href="#definitions">Definitions</a></li>
            <li><a href="#license">License Grant</a></li>
            <li><a href="#restrictions">Restrictions</a></li>
            <li><a href="#ip">Intellectual Property</a></li>
            <li><a href="#obligations">User Obligations</a></li>
            <li><a href="#payment">Payment and Pricing</a></li>
            <li><a href="#delivery">Delivery</a></li>
            <li><a href="#modifications">Modifications to Products</a></li>
            <li><a href="#disclaimers">Disclaimers</a></li>
            <li><a href="#liability">Limitation of Liability</a></li>
            <li><a href="#indemnification">Indemnification</a></li>
            <li><a href="#termination">Termination</a></li>
            <li><a href="#law">Governing Law</a></li>
            <li><a href="#disputes">Dispute Resolution</a></li>
            <li><a href="#changes">Changes to Terms</a></li>
            <li><a href="#severability">Severability</a></li>
            <li><a href="#entire">Entire Agreement</a></li>
            <li><a href="#contact">Contact</a></li>
          </ol>
        </nav>

        <h2 id="acceptance">1. Acceptance of Terms</h2>
        <p>
          By accessing the Promptos website, creating an account, or purchasing any product offered
          by Promptos (the &ldquo;Products&rdquo;), you agree to be bound by these Terms of Service
          and our Privacy Policy. If you do not agree, do not use the website or purchase the
          Products.
        </p>
        <p>
          If you are using the Products on behalf of an organization, you represent that you have
          authority to bind that organization to these Terms, and the term &ldquo;you&rdquo; refers
          to both you and that organization.
        </p>

        <h2 id="definitions">2. Definitions</h2>
        <p><strong>Promptos</strong> refers to the Promptos brand and its operating entity (collectively, &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).</p>
        <p><strong>Products</strong> means all prompt packs, playbooks, Authority products, bundles, and any other digital products sold via promptos.store.</p>
        <p><strong>Customer</strong> or <strong>buyer</strong> means any individual or entity that purchases a Product.</p>
        <p><strong>Content</strong> means the prompts, text, templates, illustrations, and other materials included in any Product.</p>
        <p><strong>Services</strong> means the website, support, and ongoing delivery of the Products and updates.</p>

        <h2 id="license">3. License Grant</h2>
        <p>
          Subject to your full payment and continuing compliance with these Terms, Promptos grants
          you a limited, non-exclusive, non-transferable, revocable license to:
        </p>
        <ul>
          <li>Use the Products for your personal purposes;</li>
          <li>Use the Products in the course of your professional or client work, subject to the restrictions in Section 4;</li>
          <li>Modify the Products for your own personal or client use;</li>
          <li>Generate outputs using the prompts. Outputs you generate using a Promptos prompt belong to you, subject to the model provider&apos;s terms of service.</li>
        </ul>

        <h2 id="restrictions">4. Restrictions</h2>
        <p>
          The full list of license restrictions is in our <a href="/license">License Agreement</a>.
          In summary, you may not resell, redistribute, sublicense, share, repackage, or publicly
          republish the Products, in whole or in part. Each Product is watermarked with your
          purchase identifier (see Section 4 of the License Agreement for details on enforcement).
        </p>

        <h2 id="ip">5. Intellectual Property</h2>
        <p>
          All Products, including but not limited to text, structure, layout, illustrations, code,
          and presentation, are the property of Promptos and are protected by copyright,
          trademark, and other intellectual property laws. The license granted in Section 3 does
          not transfer any ownership rights in the Products to you.
        </p>
        <p>
          Promptos trademarks (including &ldquo;Promptos&rdquo; and the wordmark) may not be used
          without prior written permission.
        </p>

        <h2 id="obligations">6. User Obligations</h2>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate contact and payment information at checkout;</li>
          <li>Use the Products and Services only for lawful purposes and in compliance with these Terms;</li>
          <li>Maintain the confidentiality of any account credentials;</li>
          <li>Notify us promptly of any suspected unauthorized use of your account or any Product.</li>
        </ul>

        <h2 id="payment">7. Payment and Pricing</h2>
        <p>
          All prices on the website are listed in United States Dollars (USD) unless otherwise
          specified. Local taxes (VAT, GST, sales tax) are calculated at checkout where applicable
          based on the billing jurisdiction.
        </p>
        <p>
          Payment is processed by third-party payment processors (including Shopify Payments,
          Stripe, PayPal, Apple Pay, Google Pay, and Shop Pay). By submitting payment information,
          you authorize Promptos and its processors to charge the applicable amount to your
          selected payment method.
        </p>
        <p>
          Promptos reserves the right to change prices at any time. Price changes do not apply to
          purchases completed before the change takes effect.
        </p>

        <h2 id="delivery">8. Delivery</h2>
        <p>
          Products are delivered as instant digital downloads to the email address provided at
          checkout. If you do not receive your download link within 30 minutes of payment, check
          your spam folder, then contact <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>. We will
          resolve delivery issues within one business day.
        </p>

        <h2 id="modifications">9. Modifications to Products</h2>
        <p>
          Promptos may update Products over time, including adding prompts, revising chapters, or
          refining templates. As a buyer of a Product, you are entitled to receive the updated
          versions of that Product at no additional charge for the lifetime of the Product (the
          &ldquo;lifetime updates&rdquo; promise).
        </p>
        <p>
          Promptos reserves the right to retire a Product. If a Product is retired, prior buyers
          retain perpetual access to the version they purchased, and may request a copy from{' '}
          <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>.
        </p>

        <h2 id="disclaimers">10. Disclaimers</h2>
        <p>
          <strong>The Products are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> without warranties of
          any kind, express or implied, including but not limited to warranties of merchantability,
          fitness for a particular purpose, non-infringement, or results. Promptos does not
          guarantee any specific business outcome, revenue, or success from using the Products.
        </p>
        <p>
          The Products provide frameworks, prompts, and guidance. Your results depend on your own
          execution, market conditions, and many factors outside our control. Examples of revenue,
          customer counts, or outcomes referenced in any Product or marketing material reflect
          past results of operators we have worked with and are not promises of similar results
          for you.
        </p>

        <h2 id="liability">11. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, in no event shall Promptos, its
          affiliates, officers, employees, contractors, or licensors be liable for any indirect,
          incidental, special, consequential, or punitive damages, including lost profits, lost
          revenue, lost data, or business interruption, arising out of or relating to your use of
          the Products or Services, even if advised of the possibility of such damages.
        </p>
        <p>
          <strong>
            Promptos&apos;s total cumulative liability to you for any claim arising out of or
            relating to these Terms or the Products is capped at the amount you paid for the
            specific Product giving rise to the claim.
          </strong>
        </p>

        <h2 id="indemnification">12. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Promptos, its affiliates, officers,
          employees, and contractors from any claim, demand, loss, liability, damage, or expense
          (including reasonable attorneys&apos; fees) arising out of: (i) your breach of these
          Terms or the License Agreement, (ii) your misuse of the Products, (iii) your violation
          of any applicable law, or (iv) any content you generate, distribute, or publish using
          the Products.
        </p>

        <h2 id="termination">13. Termination</h2>
        <p>
          Promptos may terminate or suspend your license and access to the Products at any time,
          without notice, for any material breach of these Terms or the License Agreement,
          including but not limited to unauthorized redistribution or resale of the Products.
          Upon termination, your license ends and you must destroy all copies of the Products in
          your possession.
        </p>

        <h2 id="law">14. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the jurisdiction in which Promptos is
          incorporated, without regard to conflict-of-laws principles.
        </p>
        <div className="legal-note">
          <strong>Attorney review required.</strong> The specific governing-law jurisdiction must
          be customized to match Promptos&apos;s actual country and state of incorporation before
          launch. Consult counsel in your operating jurisdiction.
        </div>

        <h2 id="disputes">15. Dispute Resolution</h2>
        <p>
          Any dispute arising out of or relating to these Terms or the Products will first be
          attempted to be resolved by good-faith negotiation between you and Promptos. If
          negotiation fails, the dispute will be resolved by binding arbitration under the rules of
          a recognized arbitration association in the governing-law jurisdiction. Each party will
          bear its own costs of arbitration.
        </p>
        <p>
          <strong>Carve-out for IP claims.</strong> Notwithstanding the arbitration clause above,
          Promptos may bring claims for infringement, misappropriation, or breach of the License
          Agreement (Section 4 in particular) in any court of competent jurisdiction. Equitable
          relief (including injunctions) may be sought without first resorting to arbitration.
        </p>

        <h2 id="changes">16. Changes to Terms</h2>
        <p>
          Promptos may update these Terms from time to time. Material changes will be announced via
          email to the address on file for active customers, with at least 30 days notice before
          the changes take effect. Your continued use of the Products after the effective date of
          the updated Terms constitutes acceptance.
        </p>

        <h2 id="severability">17. Severability</h2>
        <p>
          If any provision of these Terms is held to be invalid or unenforceable, that provision
          will be modified to the minimum extent necessary to make it enforceable, and the
          remaining provisions will continue in full force and effect.
        </p>

        <h2 id="entire">18. Entire Agreement</h2>
        <p>
          These Terms, together with the <a href="/privacy">Privacy Policy</a>, the{' '}
          <a href="/license">License Agreement</a>, the <a href="/refunds">Refund Policy</a>, the{' '}
          <a href="/legal/cookies">Cookie Policy</a>, the <a href="/legal/dmca">DMCA Policy</a>,
          and the <a href="/legal/acceptable-use">Acceptable Use Policy</a> constitute the entire
          agreement between you and Promptos with respect to the Products and Services, and
          supersede any prior or contemporaneous agreements on the same subject matter.
        </p>

        <h2 id="contact">19. Contact</h2>
        <p>
          For legal questions, send notice to <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> with the
          subject line &ldquo;Legal: [your topic].&rdquo; We respond within 5 business days.
        </p>
      </div>
    </main>
  );
}
