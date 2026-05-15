import type {Route} from './+types/why-promptos';
import {SectionFade} from '~/components/promptos/SectionFade';
import {Link} from 'react-router';

export const meta: Route.MetaFunction = () => [
  {title: 'Why Promptos? The Honest Case for Skipping Courses and DIY · Promptos'},
  {
    name: 'description',
    content:
      "An honest comparison of online courses, DIY learning, and structured playbooks. Why $97 to $497 for a complete playbook beats $5,000 for a mentorship every time.",
  },
  // Open Graph / Twitter
  {property: 'og:title', content: 'Why Promptos? The honest case against courses and DIY.'},
  {
    property: 'og:description',
    content:
      'Three ways to start a real business. Two of them waste your year or your savings. One of them does not. Read the honest comparison.',
  },
  {property: 'og:type', content: 'article'},
  {property: 'og:image', content: '/why-promptos-og.png'},
  {name: 'twitter:card', content: 'summary_large_image'},
  {name: 'twitter:title', content: 'Why Promptos? The honest case against courses and DIY.'},
];

export default function WhyPromptos() {
  return (
    <main id="main" className="page is-active why-page" data-page="why-promptos">
      {/* ============================================================
          SECTION 1 — HERO
          ============================================================ */}
      <section className="why-hero" aria-labelledby="why-hero-title">
        <div className="why-hero-mesh" aria-hidden />
        <div className="why-hero-dots" aria-hidden />
        <div className="why-hero-inner">
          <SectionFade as="div">
            <span className="why-hero-eyebrow">An honest case for Promptos</span>
            <h1 id="why-hero-title" className="why-hero-title">
              There are three ways to start a real business.
            </h1>
            <p className="why-hero-sub">
              Only one of them does not waste your year, your savings, or both.
            </p>
            <a href="#setup" className="why-hero-scrollcue" aria-label="Read on">
              Read on <span aria-hidden>↓</span>
            </a>
          </SectionFade>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — THE SETUP
          ============================================================ */}
      <section className="why-section why-section-cream" id="setup">
        <article className="why-article">
          <SectionFade as="div">
            <p className="why-editorial drop-cap">
              You want to start something. A digital products business, an AI automation agency, a
              personal brand, a newsletter, a content empire. Pick the model. The challenge isn&apos;t
              motivation. The challenge is: how do you actually get from where you are to your first
              real customer without setting your money or your year on fire?
            </p>
            <p className="why-editorial">
              There are exactly three paths. Most people pick one of the first two and end up with
              nothing to show for it. The third path is what Promptos is built around. Here&apos;s
              the honest comparison.
            </p>

            <blockquote className="why-pull">
              <p>
                The problem isn&apos;t that you can&apos;t find information. The problem is that 95%
                of what&apos;s out there is either incomplete, expensive, or designed to keep selling
                you more.
              </p>
            </blockquote>
          </SectionFade>
        </article>
      </section>

      {/* ============================================================
          SECTION 3 — PATH 1: THE COURSE TRAP
          ============================================================ */}
      <section className="why-section why-section-warn" id="path-1" aria-labelledby="path-1-title">
        <article className="why-article">
          <SectionFade as="div">
            <span className="why-section-label why-label-warn">Path 1</span>
            <h2 id="path-1-title" className="why-section-headline">
              The Course Trap
            </h2>
            <p className="why-section-sub">
              $2,000 to $10,000 for someone else&apos;s brand.
            </p>

            <p className="why-editorial">
              Open Twitter or TikTok for ten minutes and you&apos;ll see them: the same 47 "business
              gurus" selling the same 12 business models, with the same Lamborghini-rented-by-the-hour
              photos and the same "7-figure mastermind" upsells.
            </p>
            <p className="why-editorial">Here&apos;s how it actually works.</p>
            <p className="why-editorial">
              Most online course creators didn&apos;t get rich running the business they&apos;re
              selling. They got rich selling the course about running that business. The course is
              the business model. Their credibility comes from their follower count, which they built
              before they ever sold a real product to a real customer in that niche.
            </p>
            <p className="why-editorial">
              Think about that for a second. You&apos;re paying $2,000 to learn how to run an AI
              automation agency from someone who built their AI automation agency by, well, selling
              an AI automation course. The actual operators in the space, the people running
              $30k/mo agencies, don&apos;t have time to make courses. They&apos;re too busy
              delivering for clients.
            </p>
            <p className="why-editorial">Then there&apos;s the structure of what you&apos;re actually buying.</p>
            <p className="why-editorial">
              The product is rarely just the course. It&apos;s a $497 "starter program" that contains
              90% of what you need but is missing the actual "how to execute" part. That&apos;s
              reserved for the $1,997 "core program." The core program is missing the "how to scale"
              part. That&apos;s the $4,997 mastermind. The mastermind is missing the "how to actually
              close clients" part. That&apos;s the $9,997 one-on-one coaching tier. There is always a
              next tier. The funnel is the product.
            </p>
            <p className="why-editorial">
              Industry data suggests most online courses have completion rates below 10%. People buy
              them, watch three videos, and never finish. The course creator doesn&apos;t care.
              They already have your money, and the upsell sequence runs whether you finish or not.
            </p>
            <p className="why-editorial">
              A handful of course creators are genuinely good operators who genuinely teach well. The
              problem is finding them in a market where most of the noise is the opposite. By the
              time you&apos;ve figured out which courses are worth it, you&apos;ve spent thousands
              testing duds.
            </p>

            <aside className="why-callout why-callout-warn" aria-label="What you're actually paying for">
              <span className="why-callout-label">What you&apos;re actually paying for</span>
              <ul>
                <li>The creator&apos;s personal brand and parasocial appeal</li>
                <li>40+ hours of video designed to feel substantial</li>
                <li>Access to a "community" that is mostly other beginners</li>
                <li>Constant upsells to the next tier</li>
                <li>Information that is also available free on YouTube, just disorganized</li>
                <li>A 9% chance you&apos;ll actually finish</li>
              </ul>
            </aside>

            <div className="why-bottom-line why-bottom-line-warn">
              <span className="why-bottom-line-label">Bottom line</span>
              <p>
                Average outcome for the typical buyer: $0 in revenue, $2,000 to $5,000 out of
                pocket, four modules finished, eight months gone, and the lingering suspicion that
                maybe you just weren&apos;t disciplined enough. (You were. The structure was the
                problem.)
              </p>
            </div>
          </SectionFade>
        </article>
      </section>

      {/* ============================================================
          SECTION 4 — PATH 2: THE DIY TRAP
          ============================================================ */}
      <section className="why-section why-section-muted" id="path-2" aria-labelledby="path-2-title">
        <article className="why-article">
          <SectionFade as="div">
            <span className="why-section-label why-label-muted">Path 2</span>
            <h2 id="path-2-title" className="why-section-headline">The DIY Trap</h2>
            <p className="why-section-sub">Free, but expensive.</p>

            <p className="why-editorial">
              The smart move, you tell yourself, is to skip the gurus and figure it out yourself.
              YouTube is free. Reddit is free. There are a thousand newsletters and a million blog
              posts. Why pay anyone?
            </p>
            <p className="why-editorial">Try it for a week.</p>
            <p className="why-editorial">
              You open YouTube. You search "how to start an AI automation agency." You get 200
              results. Half are from creators trying to sell you a course (back to Path 1). The
              other half are from operators who genuinely know what they&apos;re doing, but their
              videos are 17 minutes long, fragmented across a 40-video playlist, and every other one
              assumes context from a video you haven&apos;t watched yet.
            </p>
            <p className="why-editorial">
              You pick a video. The creator spends the first three minutes selling their newsletter,
              the next four explaining what an AI agency is (you already know), and the last ten
              giving you 30% of the information you need. Then they tell you to subscribe for next
              week&apos;s video, which will cover the next 30%. Their incentive is to give you
              exactly enough to keep watching, not enough to actually build.
            </p>
            <p className="why-editorial">
              You spend three hours on YouTube. You have nine open tabs. The advice contradicts
              itself. One creator says charge $5K/mo retainers. Another says $1,500. A third says
              hourly. You have no idea which is right for someone with no experience and no
              portfolio.
            </p>
            <p className="why-editorial">
              A week later you&apos;ve watched 14 hours of video. You have a Notion doc full of
              scattered notes. You still don&apos;t know how to write your first cold email, what to
              put in a proposal, what tools to actually pay for vs. use free, or how to onboard your
              first client when you finally land one.
            </p>
            <p className="why-editorial">
              The information IS technically free. But the cost is your time, your sanity, and the
              fact that you&apos;ll never quite have the complete picture. Most people quit at this
              stage and return to their day job convinced this whole "starting a business" thing
              wasn&apos;t for them.
            </p>
            <p className="why-editorial">It was for you. The problem was the format.</p>

            <aside className="why-callout why-callout-muted" aria-label="What free information costs you">
              <span className="why-callout-label">What free information costs you</span>
              <ul>
                <li>50 to 200 hours of video time to piece together fragments</li>
                <li>Conflicting advice from creators with different incentives</li>
                <li>No coherent framework, just isolated tactics</li>
                <li>No templates, scripts, or executable assets</li>
                <li>No 90-day plan from "decided" to "first client"</li>
                <li>The motivation to quit, hidden as "I just don&apos;t have what it takes"</li>
              </ul>
            </aside>

            <div className="why-bottom-line why-bottom-line-muted">
              <span className="why-bottom-line-label">Bottom line</span>
              <p>
                Average outcome for the typical DIYer: $0 in revenue, 6 to 12 months lost, hundreds
                of YouTube hours watched, and the wrong lesson learned. The problem wasn&apos;t you.
                The problem was the medium.
              </p>
            </div>
          </SectionFade>
        </article>
      </section>

      {/* ============================================================
          SECTION 5 — PATH 3: THE PROMPTOS WAY
          ============================================================ */}
      <section className="why-section why-section-dark" id="path-3" aria-labelledby="path-3-title">
        <div className="why-section-dark-mesh" aria-hidden />
        <article className="why-article why-article-dark">
          <SectionFade as="div">
            <span className="why-section-label why-label-win">Path 3</span>
            <h2 id="path-3-title" className="why-section-headline why-section-headline-light">
              The Promptos Way
            </h2>
            <p className="why-section-sub why-section-sub-light">
              Spend a weekend with a complete playbook. Launch in 90 days.
            </p>

            <p className="why-editorial why-editorial-light">
              Imagine the same problem with a different format.
            </p>
            <p className="why-editorial why-editorial-light">
              You don&apos;t need 40 hours of video. You don&apos;t need a $4,997 mentorship. You
              don&apos;t need to piece together 200 YouTube videos and 14 newsletter signups.
            </p>
            <p className="why-editorial why-editorial-light">
              You need ONE complete, structured document that explains every part of one business,
              with the templates, scripts, and frameworks to actually execute. Written by people
              who&apos;ve done it. Priced like a book, not like a Lamborghini lease.
            </p>
            <p className="why-editorial why-editorial-light">
              That&apos;s what a <Link className="why-link" to="/guides" prefetch="intent">Promptos Playbook</Link> is.
            </p>
            <p className="why-editorial why-editorial-light">
              Sit down with a Promptos Playbook for two to four hours. By the end of it, you have:
            </p>

            <ul className="why-list-light">
              <li>
                The exact business model with real unit economics. Not "this can be profitable" but
                "$3,500/mo retainer × 8 clients = $28K MRR with these specific costs and margins."
              </li>
              <li>The exact tools you need, with current pricing and the order to set them up.</li>
              <li>
                The exact scripts for cold outreach, sales calls, proposals, and onboarding.
                Copy-paste-ready, not "craft your own message based on these principles."
              </li>
              <li>
                The 90-day roadmap, week by week. Day 1 you do this. Day 30 you do that. Day 90 you
                have your first paying customer.
              </li>
              <li>The honest failure modes. What doesn&apos;t work, who shouldn&apos;t try it, when to walk away.</li>
            </ul>

            <p className="why-editorial why-editorial-light">
              And here&apos;s the part that matters most: you spend $97 to $497, once, and you own
              it forever. No upsells. No "next tier." No mastermind. No coaching call you have to
              book to actually understand chapter four. The information is complete. The execution
              is on you, but you know exactly what to execute.
            </p>
            <p className="why-editorial why-editorial-light">
              Pair the playbook with a <Link className="why-link" to="/packs" prefetch="intent">Promptos Prompt Pack</Link>,
              60 to 75 battle-tested AI prompts for the daily execution work, and you have the two
              layers covered: the strategy (what to build), and the daily speed (how to ship the
              content, copy, code, and outreach that powers it).
            </p>

            <aside className="why-callout why-callout-win" aria-label="What you're actually paying for">
              <span className="why-callout-label">What you&apos;re actually paying for</span>
              <ul>
                <li>A complete, structured playbook for ONE specific business</li>
                <li>Real frameworks with names, not "general principles"</li>
                <li>Word-for-word scripts and templates</li>
                <li>Current tool pricing and stack recommendations</li>
                <li>A 90-day roadmap from decision to first client</li>
                <li>Honest failure modes (no survivorship bias)</li>
                <li>Lifetime access. No upsells. Ever.</li>
              </ul>
            </aside>

            <div className="why-bottom-line why-bottom-line-win">
              <span className="why-bottom-line-label">Designed outcome</span>
              <p>
                A real, structured business launched in 60 to 90 days, with paying clients, for less
                than the cost of one mentorship call.
              </p>
            </div>
          </SectionFade>
        </article>
      </section>

      {/* ============================================================
          SECTION 6 — THE MATH
          ============================================================ */}
      <section className="why-section why-section-paper" id="math" aria-labelledby="math-title">
        <div className="why-math-inner">
          <SectionFade as="div" className="why-math-head">
            <span className="section-eyebrow">The math</span>
            <h2 id="math-title" className="why-section-headline">The honest cost comparison.</h2>
            <p className="why-section-sub">Same goal. Three paths. Wildly different math.</p>
          </SectionFade>

          <SectionFade as="div" className="why-table-wrap">
            <table className="why-table" aria-label="Comparison of three paths to start a business">
              <caption className="sr-only">
                A side-by-side comparison of online courses, DIY learning, and Promptos playbooks
                across cost, time, deliverables, and outcomes.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="row-label">Dimension</th>
                  <th scope="col" className="col-warn">The Course Trap</th>
                  <th scope="col" className="col-muted">The DIY Trap</th>
                  <th scope="col" className="col-win">
                    <span className="why-table-badge">Recommended</span>
                    The Promptos Way
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Cost</th>
                  <td>$2,000 to $10,000+</td>
                  <td>$0 cash, all time</td>
                  <td className="col-win">$97 to $497, once</td>
                </tr>
                <tr>
                  <th scope="row">Time to complete</th>
                  <td>40 to 80 hours of video</td>
                  <td>100 to 300 hours of fragments</td>
                  <td className="col-win">2 to 4 hours to read</td>
                </tr>
                <tr>
                  <th scope="row">What you get</th>
                  <td>Branded videos + community</td>
                  <td>Scattered YouTube knowledge</td>
                  <td className="col-win">Complete playbook + templates</td>
                </tr>
                <tr>
                  <th scope="row">Upsells</th>
                  <td>Constant</td>
                  <td>None (it&apos;s free)</td>
                  <td className="col-win">None</td>
                </tr>
                <tr>
                  <th scope="row">Completion rate</th>
                  <td>Below 10% (industry avg.)</td>
                  <td>~5% finish their research</td>
                  <td className="col-win">~80% finish reading</td>
                </tr>
                <tr>
                  <th scope="row">Templates included</th>
                  <td>Sometimes (locked behind tier)</td>
                  <td>None (you build everything)</td>
                  <td className="col-win">Always (40+ per playbook)</td>
                </tr>
                <tr>
                  <th scope="row">90-day plan</th>
                  <td>Vague principles</td>
                  <td>None</td>
                  <td className="col-win">Week-by-week</td>
                </tr>
                <tr>
                  <th scope="row">Refundable</th>
                  <td>Usually not</td>
                  <td>N/A</td>
                  <td className="col-win">Yes (30-day guarantee)</td>
                </tr>
                <tr>
                  <th scope="row">Outcome at 90 days</th>
                  <td>Four modules watched</td>
                  <td>14 YouTube tabs open</td>
                  <td className="col-win">First paying client</td>
                </tr>
              </tbody>
            </table>
          </SectionFade>

          <SectionFade as="blockquote" className="why-pull why-pull-centered">
            <p>
              $497 for a complete playbook vs. $4,997 for a mentorship that ends at chapter four.
              The math isn&apos;t close.
            </p>
          </SectionFade>
        </div>
      </section>

      {/* ============================================================
          SECTION 7 — WHAT PROMPTOS ACTUALLY IS
          ============================================================ */}
      <section className="why-section why-section-cream" id="what-it-is" aria-labelledby="what-it-is-title">
        <article className="why-article">
          <SectionFade as="div">
            <h2 id="what-it-is-title" className="why-section-headline">What Promptos actually is.</h2>
            <p className="why-editorial">
              Let&apos;s be specific about what you&apos;re buying. Promptos sells two kinds of
              products.
            </p>

            <p className="why-editorial">
              <strong className="why-pop">Prompt Packs.</strong>{' '}
              Battle-tested AI prompts for specific professional jobs. Marketing, writing, coding,
              content creation, productivity. 60 to 75 prompts per pack, each with the prompt,
              customization notes, example outputs, and pro tips. $29 to $39 each. For the work you
              do every day. <Link className="why-link" to="/packs" prefetch="intent">Browse all packs →</Link>
            </p>

            <p className="why-editorial">
              <strong className="why-pop">Playbooks.</strong>{' '}
              Complete business guides on starting and running a specific business model. AI
              automation agencies, web design agencies, newsletter businesses, coaching practices,
              digital products, and more. 75 to 100 pages each, with real frameworks, real numbers,
              real scripts, and a 90-day roadmap. $97 to $497 each. For the business you want to
              build. <Link className="why-link" to="/guides" prefetch="intent">Browse all playbooks →</Link>
            </p>

            <p className="why-editorial">
              The two product lines are designed to work together. The Playbook gives you the
              strategy. The Prompt Packs give you the daily execution speed. Pair them and you have
              both layers covered. The <Link className="why-link" to="/bundles/everything" prefetch="intent">Everything Bundle</Link>{' '}
              has every product across both lines at $798 (save $914).
            </p>

            <p className="why-editorial">
              That&apos;s it. That&apos;s the whole company. No subscription, no upsell ladder, no
              "next tier" you have to graduate to. You buy a thing, you own it, you use it, you
              build something.
            </p>
          </SectionFade>
        </article>
      </section>

      {/* ============================================================
          SECTION 8 — WHAT PROMPTOS IS NOT
          ============================================================ */}
      <section className="why-section why-section-paper" id="what-it-isnt" aria-labelledby="what-it-isnt-title">
        <article className="why-article">
          <SectionFade as="div">
            <h2 id="what-it-isnt-title" className="why-section-headline">What Promptos is NOT.</h2>

            <div className="why-not-list">
              {[
                {
                  label: 'Not a course.',
                  body: "We don't make 40-hour video curriculums. The information you need fits in a well-written document. We don't waste your time padding it.",
                },
                {
                  label: 'Not a mentorship.',
                  body: "We don't sell coaching calls or 'office hours.' If you need someone to hold your hand through every decision, this isn't for you. The playbooks are designed to be self-sufficient.",
                },
                {
                  label: 'Not a community.',
                  body: "No Discord, no Circle, no mastermind. The product is the product. We're not in the business of running a forum.",
                },
                {
                  label: 'Not a subscription.',
                  body: 'Pay once, own it forever. No monthly bills, no auto-renewals.',
                },
                {
                  label: 'Not infinite upsells.',
                  body: "There is no 'core program' behind the starter program. What you see on the product page is what you get.",
                },
                {
                  label: "Not a guru's personal brand.",
                  body: "Promptos is a product company. It happens to be founded by Nathan, but the brand is the playbooks, not the founder. We don't sell the dream of becoming Nathan. We sell the actual playbooks.",
                },
              ].map((item) => (
                <div key={item.label} className="why-not-item">
                  <strong className="why-not-label">{item.label}</strong>{' '}
                  <span className="why-not-body">{item.body}</span>
                </div>
              ))}
            </div>
          </SectionFade>
        </article>
      </section>

      {/* ============================================================
          SECTION 9 — REAL TALK / OBJECTIONS
          ============================================================ */}
      <section className="why-section why-section-cream" id="real-talk" aria-labelledby="real-talk-title">
        <article className="why-article">
          <SectionFade as="div">
            <h2 id="real-talk-title" className="why-section-headline">Real talk.</h2>
            <p className="why-section-sub">
              The objections you&apos;re actually having, answered without flinching.
            </p>
          </SectionFade>

          <dl className="why-qa-list">
            {[
              {
                q: '"$497 for a PDF is a lot."',
                a: "True. But compared to $4,997 for a mentorship that ends at chapter four, or 200 hours of YouTube that leaves you with nothing executable, it's the cheapest path to a real business. And if it doesn't work for you, the 30-day refund means you risk nothing.",
              },
              {
                q: '"Why should I trust this over a course from someone with 500K followers?"',
                a: "Followers measure marketing, not operational expertise. The playbooks are built from real operator interviews and verified frameworks. We don't sell the dream. We sell the document. You'll see for yourself whether the information is real.",
              },
              {
                q: '"What if I want video, not text?"',
                a: "Then Promptos isn't for you, and that's fine. We chose text because text is searchable, skimmable, and doesn't pad 10 minutes of content into 40. Some people genuinely learn better through video. The data says most don't. They just feel like they do.",
              },
              {
                q: '"What if I get the playbook and don\'t do anything with it?"',
                a: "Then you'll have wasted $97 to $497, which is bad but recoverable. Compare that to wasting $4,997 on a course you also don't complete, or 8 months on YouTube tabs. The downside is bounded. The upside is real.",
              },
              {
                q: '"What if the business model isn\'t right for me?"',
                a: "Each playbook has a 'Who this is NOT for' section. Read that first. If we tell you not to buy it, we mean it.",
              },
              {
                q: '"Why no mentorship?"',
                a: "Because a good playbook makes mentorship unnecessary, and a bad playbook makes mentorship a Band-Aid on a structural problem. We're betting on the playbook being good enough to stand alone.",
              },
            ].map((item) => (
              <SectionFade key={item.q} as="div" className="why-qa">
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </SectionFade>
            ))}
          </dl>
        </article>
      </section>

      {/* ============================================================
          SECTION 10 — THE DECISION
          ============================================================ */}
      <section className="why-section why-section-dark why-decision" id="decision" aria-labelledby="decision-title">
        <div className="why-section-dark-mesh" aria-hidden />
        <div className="why-decision-inner">
          <SectionFade as="div" className="why-decision-head">
            <span className="section-eyebrow why-label-win">The decision</span>
            <h2 id="decision-title" className="why-section-headline why-section-headline-light">
              The decision is simple.
            </h2>
            <p className="why-section-sub why-section-sub-light">
              Three paths. One of them respects your time and money.
            </p>
          </SectionFade>

          <div className="why-decision-grid">
            <SectionFade as="div" className="why-decision-card why-decision-card-warn" delayMs={0}>
              <span className="why-decision-card-label">The Course Trap</span>
              <p className="why-decision-card-price">$2,000 to $10,000</p>
              <p className="why-decision-card-body">Uncertain outcome.</p>
            </SectionFade>
            <SectionFade as="div" className="why-decision-card why-decision-card-muted" delayMs={200}>
              <span className="why-decision-card-label">The DIY Trap</span>
              <p className="why-decision-card-price">Free, costs you a year</p>
              <p className="why-decision-card-body">Uncertain outcome.</p>
            </SectionFade>
            <SectionFade as="div" className="why-decision-card why-decision-card-win" delayMs={400}>
              <span className="why-decision-badge">Recommended</span>
              <span className="why-decision-card-label">The Promptos Way</span>
              <p className="why-decision-card-price">$97 to $497, once</p>
              <p className="why-decision-card-body">First client in 90 days.</p>
            </SectionFade>
          </div>

          <SectionFade as="div" className="why-decision-cta">
            <Link to="/guides" prefetch="intent" className="btn btn-large btn-cream btn-arrow why-decision-cta-primary">
              Browse the Playbooks
            </Link>
            <Link to="/packs" prefetch="intent" className="why-decision-cta-secondary">
              Or start smaller, browse Prompt Packs →
            </Link>
          </SectionFade>
        </div>
      </section>

      {/* ============================================================
          SECTION 11 — CLOSING NOTE FROM NATHAN
          ============================================================ */}
      <section className="why-section why-section-paper why-closing" id="note" aria-labelledby="note-title">
        <article className="why-article">
          <SectionFade as="div">
            <h2 id="note-title" className="why-closing-headline">A short note from Nathan.</h2>

            <p className="why-editorial">
              I built Promptos because I got tired of watching people I cared about hand $5,000 to
              course creators who&apos;d never run the business they were selling, then quit after
              module four because the structure didn&apos;t work.
            </p>
            <p className="why-editorial">
              The information should be cheaper. The format should respect your time. The product
              should stand on its own without a mastermind upsell behind it.
            </p>
            <p className="why-editorial">
              If a Promptos playbook helps even one person launch a real business, and the early
              access feedback says it has, then it&apos;s worth doing.
            </p>
            <p className="why-editorial">
              If it&apos;s not for you, that&apos;s genuinely fine. There&apos;s a 30-day
              money-back guarantee. You won&apos;t get a sales call trying to keep you on.
              You&apos;ll just get a refund.
            </p>
            <p className="why-editorial">
              But if it IS for you, get to work. Building a real business is still hard. We just
              want to make sure the hard part is the execution, not figuring out what to execute.
            </p>

            <div className="why-signature">
              <svg
                className="why-signature-svg"
                viewBox="0 0 240 60"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M8 38 Q 16 12 28 22 T 56 30 Q 70 12 84 32 Q 96 50 110 18 Q 124 8 138 40 Q 152 28 168 18 Q 188 14 206 36 Q 220 46 232 22"
                  stroke="#1F2937"
                  strokeWidth="2.2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M8 50 L 232 50" stroke="#EC4899" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
              </svg>
              <p className="why-signature-name">Nathan</p>
              <p className="why-signature-role">Founder, Promptos</p>
            </div>
          </SectionFade>
        </article>
      </section>
    </main>
  );
}
