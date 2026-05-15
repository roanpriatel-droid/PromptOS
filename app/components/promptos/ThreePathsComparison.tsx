import {Link} from 'react-router';
import {SectionFade} from './SectionFade';

type ThreePathsProps = {
  title?: string;
  subtitle?: string;
  winnerCta?: {label: string; to: string};
};

const DEFAULT_TITLE = 'Three ways to start a real business.';
const DEFAULT_SUBTITLE = "Only one of them doesn't waste your money or your year.";

const COURSE = {
  title: 'Pay $2,000–$10,000+',
  bullets: [
    'Months of video lessons you\'ll never finish',
    'Constant upsells to the "next level mastermind"',
    'Generic advice that doesn\'t fit your situation',
    'Coaches who\'ve never run the business themselves',
    'You finish 4 modules, then quit',
  ],
  footnote: 'Average outcome: $0 in revenue, $5K out of pocket.',
};

const DIY = {
  title: 'Free, but expensive',
  bullets: [
    'Stitching together 100 YouTube videos',
    'Reading Reddit threads with conflicting advice',
    'Guessing at pricing, scope, contracts',
    '8 months in, still no clients',
    'Burnout, then back to your day job',
  ],
  footnote: 'Average outcome: $0 in revenue, 1 year lost.',
};

const WIN = {
  title: 'Pay $97–$497, once',
  bullets: [
    'Complete step-by-step playbook for ONE business',
    'Real scripts, real templates, real numbers',
    'Pair with prompt packs for daily execution',
    '90-day roadmap from day 1 to first client',
    'Lifetime access. No upsells. Ever.',
  ],
  footnote: 'Designed outcome: paying clients within 90 days.',
};

export function ThreePathsComparison({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  winnerCta = {label: 'Browse the playbooks', to: '/guides'},
}: ThreePathsProps) {
  return (
    <section className="three-paths">
      <SectionFade as="div" className="three-paths-head">
        <div className="section-eyebrow">The three paths</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </SectionFade>

      <div className="paths-grid">
        <SectionFade as="div" className="path-card warn" delayMs={0}>
          <div className="label">Path one</div>
          <h3>The course / mentorship</h3>
          <p className="muted-summary" style={{fontSize: 18, fontFamily: 'var(--font-serif)', color: 'var(--ink)', marginBottom: 18}}>
            {COURSE.title}
          </p>
          <ul>{COURSE.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          <div className="footnote">{COURSE.footnote}</div>
        </SectionFade>

        <SectionFade as="div" className="path-card muted" delayMs={140}>
          <div className="label">Path two</div>
          <h3>Do it yourself</h3>
          <p style={{fontSize: 18, fontFamily: 'var(--font-serif)', color: 'var(--ink)', marginBottom: 18}}>
            {DIY.title}
          </p>
          <ul>{DIY.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          <div className="footnote">{DIY.footnote}</div>
        </SectionFade>

        <SectionFade as="div" className="path-card win" delayMs={280}>
          <div className="badge">Recommended</div>
          <div className="label">Path three</div>
          <h3>Promptos Playbooks</h3>
          <p style={{fontSize: 18, fontFamily: 'var(--font-serif)', color: 'var(--paper)', marginBottom: 18}}>
            {WIN.title}
          </p>
          <ul>{WIN.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          <div className="footnote">{WIN.footnote}</div>
          <Link to={winnerCta.to} prefetch="intent" className="cta">
            {winnerCta.label} <span aria-hidden>→</span>
          </Link>
        </SectionFade>
      </div>
    </section>
  );
}
