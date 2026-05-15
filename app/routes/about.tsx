import type {Route} from './+types/about';
import {SectionFade} from '~/components/promptos/SectionFade';
import {Link} from 'react-router';

export const meta: Route.MetaFunction = () => [
  {title: 'About · Promptos'},
  {
    name: 'description',
    content:
      "Two product lines, one quality bar. Prompt packs for the work you do every day; playbooks for the business you want to build.",
  },
];

export default function About() {
  return (
    <main id="main" className="editorial-page page is-active" data-page="about">
      <div className="editorial-inner editorial">
        <SectionFade as="div">
          <div className="eyebrow section-eyebrow">About</div>
          <h1>We got tired of <em>bad prompts.</em></h1>
          <p className="lede">
            And then we got tired of bad business advice. Promptos sells two things: prompt packs
            for the work you do every day, and playbooks for the business you want to build.
            One quality bar across both.
          </p>
        </SectionFade>

        <SectionFade as="div">
          <h2>Why Promptos started.</h2>
          <p>
            I started Promptos because I was tired of paying for prompt packs that read like Mad
            Libs and reading &ldquo;10 ChatGPT prompts to 10x your productivity&rdquo; listicles
            that all linked to the same Notion template.
          </p>
          <p>
            I&apos;d been writing prompts in a private Google Doc for a year. Friends would ask
            &ldquo;how did you get Claude to do that?&rdquo; and I&apos;d paste three lines into a
            DM. After enough DMs, I sorted my Doc into seven packs by audience, tested every prompt
            against three models, and rewrote the ones that didn&apos;t survive twenty real uses.
          </p>

          <blockquote>
            The bar is simple: would you actually keep this prompt in your day-to-day toolkit, or
            would you forget about it by the end of the week?
          </blockquote>
        </SectionFade>

        <SectionFade as="div">
          <h2>Why we expanded into guides.</h2>
          <p>
            After Promptos launched, the question we kept getting wasn&apos;t &ldquo;is there a
            prompt for X.&rdquo; It was &ldquo;how do I actually start a business that pays me
            $5k/month so I can use these prompts in real work?&rdquo;
          </p>
          <p>
            The honest answer was: a course will sell you a Discord, a YouTube binge will eat your
            year. So we wrote what we&apos;d have wanted: eight finished playbooks for the
            businesses operators are actually starting in 2026, AI agencies, agent builders, web
            design studios, digital products, newsletters, faceless content, SaaS side projects,
            coaching.
          </p>
          <p>
            They&apos;re not theory. Each playbook is 80–180 pages of frameworks, templates, and
            scripts, written by operators who actually ran the business. Same quality bar as the
            packs. Same editorial style. Same lifetime updates.
          </p>
          <p>
            More on the methodology lives on the <Link className="text-link" to="/method">method page</Link>.
            If you want the full breakdown of why playbooks beat courses, that&apos;s on{' '}
            <Link className="text-link" to="/why-promptos">why Promptos</Link>.
          </p>
        </SectionFade>

        <SectionFade as="div">
          <h2>Why we added Authority.</h2>
          <p>
            After the packs and playbooks launched, the question we kept hearing was somewhere
            in between: &ldquo;I&apos;ve been posting for months and the audience won&apos;t
            grow,&rdquo; or &ldquo;I have an audience but no paying product.&rdquo; That gap
            doesn&apos;t fit a single pack or a single business playbook, it&apos;s its own
            arc. So we shipped Authority: three products that sit between the daily prompts and
            the long-arc business book, strategy (The Personal Brand Playbook), execution (The
            Content Engine Pack), and monetization (The High-Ticket Product Finder). Same
            quality bar. Same editorial voice. Same lifetime updates.
          </p>
        </SectionFade>

        <SectionFade as="div">
          <h2>How prompts and playbooks get tested.</h2>
          <p>
            Every prompt: twenty real uses across three commercial models. If it fails on any of
            them, it gets a tuning note or it gets cut.
          </p>
          <p>
            Every playbook: read by at least two operators currently running that exact business.
            Templates are the ones we&apos;ve used in real client work. Numbers are real numbers.
            Scripts are scripts that have actually been sent.
          </p>
          <p>
            We also ran a pre-launch program with about 200 buyers across the catalog. Their
            feedback shaped the final cut, and their reviews are on{' '}
            <Link className="text-link" to="/reviews">/reviews</Link>, every one of them, including
            the critical ones.
          </p>
        </SectionFade>

        <SectionFade as="div">
          <h2>What we promise.</h2>
          <p>
            Thirty-day refund, no exit interview. Lifetime updates on every product you buy.
            Plain-English license that lets you use prompts and playbook templates in client
            work. We&apos;d rather refund 10% of buyers than keep a single frustrated one.
          </p>
        </SectionFade>

        <SectionFade as="div">
          <h2>What&apos;s next.</h2>
          <p>
            More playbooks, slowly. A quarterly cadence so existing buyers keep getting value. No
            SaaS pivot. No tokenized loyalty program. Just more good prompts and finished playbooks,
            written in the same voice, sold at the same prices.
          </p>
          <p>That&apos;s the company. That&apos;s the whole pitch.</p>
        </SectionFade>

        <SectionFade as="div" className="signature" delayMs={100}>
          <div className="avatar">MC</div>
          <div className="text">
            <div className="name">Nathan</div>
            <div className="role">Founder, Promptos · Brooklyn, NY</div>
          </div>
        </SectionFade>
      </div>
    </main>
  );
}
