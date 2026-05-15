import {Link} from 'react-router';
import {SectionFade} from './SectionFade';

/**
 * "Do yourself one favor" homepage section.
 * Sits between TwoSidesSection and ThreeTiersSection. Nudges readers to
 * the /why-promptos essay before they shop, because it converts better
 * than any product page.
 */
export function DoYourselfAFavor() {
  return (
    <section className="diyf" aria-labelledby="diyf-headline">
      <div className="diyf-inner">
        <SectionFade as="div">
          <div className="diyf-decor" aria-hidden>
            <svg viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
              <path
                d="M18 9v18M12 21l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="diyf-eyebrow">Before you scroll</span>
          <h2 id="diyf-headline" className="diyf-headline">
            Do yourself one favor.
          </h2>
          <p className="diyf-sub">
            Read &ldquo;Why Us&rdquo; before you buy anything else on this page. It&apos;s the
            most important page on this site, and it&apos;ll save you thousands of dollars and
            probably a year of your life.
          </p>

          <div className="diyf-body">
            <p>
              Most people land here, browse the products, and buy whichever pack sounds coolest.
              That works. But you&apos;ll get way more value if you spend two minutes understanding
              why Promptos exists in the first place.
            </p>
            <p>
              The &ldquo;Why Us&rdquo; page is an honest comparison of the three real paths to
              starting a business: expensive courses and mentorships, free-but-time-consuming DIY
              learning, and the structured playbook approach Promptos is built around.
            </p>
            <p>
              If after reading it you decide Promptos isn&apos;t for you, that&apos;s a win. You
              saved yourself money. If you decide it IS for you, you&apos;ll know exactly which
              product to buy and why.
            </p>
          </div>

          <Link to="/why-promptos" prefetch="intent" className="diyf-cta">
            Read Why Us <span aria-hidden>→</span>
          </Link>
          <span className="diyf-micro">Takes 4 minutes. Could save you $5,000.</span>
        </SectionFade>
      </div>
    </section>
  );
}
