import type {Route} from './+types/refunds';
import {Link} from 'react-router';

export const meta: Route.MetaFunction = () => [
  {title: 'Confidence Over Refunds · Promptos'},
  {
    name: 'description',
    content:
      'Our refund policy in plain English. Why we structure the company so you do not need a refund, and the statutory rights we honor.',
  },
];

const EFFECTIVE = 'May 14, 2026';
const SUPPORT = 'support@promptos.store';

export default function Refunds() {
  return (
    <main id="main" className="legal-page" data-page="legal-refunds">
      <div className="legal-page-inner">
        <p className="meta">Effective {EFFECTIVE}</p>
        <h1>Confidence Over Refunds</h1>
        <p className="lede">
          Because Promptos products are delivered as instant digital downloads, they are not
          eligible for traditional returns once accessed. But here is why that is actually good
          news for you: we have structured the entire company around making sure you do not need a
          refund in the first place.
        </p>

        <h2>Every product page shows you exactly what you are buying.</h2>
        <p>
          Sample chapters. Complete prompt examples. Detailed &ldquo;what&apos;s inside&rdquo;
          breakdowns. We even include a &ldquo;Who this is NOT for&rdquo; section on every
          product, because the worst outcome for both of us is you buying something that is not
          right for you.
        </p>

        <h2>We do not run upsell funnels or hidden tiers.</h2>
        <p>
          What you see on the product page is what you get. There is no &ldquo;next level&rdquo;
          you need to buy to make this work. The product is complete.
        </p>

        <h2>If something is genuinely wrong, we fix it.</h2>
        <p>
          Corrupted file, wrong product delivered, technical error on our end: email us at{' '}
          <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> and we will resolve it within 24 hours. That
          is not a refund. That is just doing right by you.
        </p>

        <h2>Statutory rights are honored.</h2>
        <p>
          If you are in a jurisdiction with statutory withdrawal rights for digital goods (such as
          the EU&apos;s 14-day right of withdrawal for unused digital purchases), those rights are
          honored as required by law. Refund requests under statutory rights must be made before
          downloading the product and within the legally required timeframe. Email{' '}
          <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> with subject line &ldquo;Statutory withdrawal
          request&rdquo; and we will process it within 14 days.
        </p>

        <h2>Chargebacks.</h2>
        <p>
          We treat fraudulent chargebacks (filing a chargeback for a product you have downloaded
          and kept) as breach of contract. Accounts associated with fraudulent chargebacks are
          permanently banned from all Promptos products, and we pursue the matter through
          Shopify&apos;s chargeback resolution process and, if necessary, civil action under the{' '}
          <Link to="/legal/terms">Terms of Service</Link>.
        </p>

        <h2>Bottom line.</h2>
        <p>
          We do not offer refunds because we do not need to. The products are good. The product
          pages tell you exactly what you are buying. The{' '}
          <Link to="/why-promptos">Why Us</Link> page explains who Promptos is for. If you have
          read both and you are still unsure, contact us before you buy. We would rather help you
          make the right call than process a refund later.
        </p>

        <p style={{marginTop: 40, fontSize: 17}}>
          Questions before you buy? <Link to="/contact" className="why-link" style={{color: 'var(--promptos-purple)', fontWeight: 600}}>Contact us →</Link>
        </p>
      </div>
    </main>
  );
}
