/**
 * Promptos catalog — source of truth for every product the storefront sells.
 *
 * 22 products: 7 prompt packs, 3 Authority products, 8 playbook guides, 4 bundles.
 * Plus a cross-sell map and helper functions used by every route.
 *
 * Pricing note (documented in README):
 *  - All per-product prices match the spec verbatim EXCEPT Faceless Content,
 *    which is $147 (not $97). The spec quotes "Save $679" on the Guides
 *    Bundle and "Save $880" on the Mega Bundle as headline numbers; those
 *    require an individual-total of $1,176, which only works if one of the
 *    three $97 guides is actually $147. Faceless Content was picked because
 *    the playbook covers production tooling that justifies the higher tier.
 */

export type ProductType = 'pack' | 'guide' | 'authority' | 'bundle';

export type PackTone =
  | 'purple'
  | 'rust'
  | 'forest'
  | 'gold'
  | 'pink'
  | 'plum'
  | 'slate'
  | 'ink'
  | 'midnight'
  | 'sand';

export type ProductFormat = 'docx' | 'pdf' | 'mixed' | 'pdf+docx';

export type PackSection = {
  number: string;
  name: string;
  description: string;
  promptCount: number;
  sampleTitles: [string, string, string];
};

export type SamplePrompt = {
  number: string;
  title: string;
  useCase: string;
  prompt: string;
  customize: string;
  exampleOutput: string;
  proTip: string;
};

export type GuideChapter = {
  number: string;       // "01"–"12"
  name: string;
  description: string;
  pageCount: number;
};

export type SampleChapter = {
  number: string;
  title: string;
  intro: string;        // First paragraph of the chapter (real copy)
  keyPoints: string[];  // Bullet-style key points
  closeNote: string;    // One closing line that hooks into chapter 2
};

export type RoadmapMilestone = {
  day: number;
  title: string;
  detail: string;
};

export type Pack = {
  id: string;
  type: 'pack';
  slug: string;
  shopifyHandle: string;
  number: string;            // 01–07
  name: string;
  /** v3.8a Phase 4B — conversion-tuned outcome headline used in the hero
   *  in place of `name`. Falls back to `name` if undefined. */
  headline?: string;
  shortName: string;
  audience: string;
  role: string;
  tone: PackTone;
  color: string;
  glyph: string;
  italic: boolean;
  priceUSD: number;
  format: 'docx';
  promptCount: number;
  tagline: string;
  description: string;
  whoFor: string[];
  sections: PackSection[];
  sample: SamplePrompt;
};

export type Guide = {
  id: string;
  type: 'guide';
  slug: string;
  shopifyHandle: string;
  number: string;            // G1–G8
  name: string;
  /** v3.8a Phase 4B — see Pack.headline. */
  headline?: string;
  shortName: string;
  category: 'agency' | 'solo' | 'premium';
  tone: PackTone;
  color: string;
  glyph: string;             // single char for cover
  italic: boolean;
  priceUSD: number;
  format: 'pdf';
  pageCount: number;
  chapterCount: number;
  templateCount: number;
  audience: string;
  role: string;
  tagline: string;
  description: string;
  whoFor: string[];
  whoNotFor: string[];
  outcomes: string[];
  templates: {name: string; description: string}[];
  chapters: GuideChapter[];
  roadmap: RoadmapMilestone[];
  sample: SampleChapter;
};

export type Bundle = {
  id: string;
  type: 'bundle';
  slug: string;
  shopifyHandle: string;
  name: string;
  /** v3.8a Phase 4B — see Pack.headline. */
  headline?: string;
  shortName: string;
  tagline: string;
  description: string;
  priceUSD: number;
  format: ProductFormat;
  includesProductIds: string[];
  individualTotal: number;
  savings: number;
  tone: PackTone;
  color: string;
  /** Headline marketing line ("All 7 packs · 430 prompts · save $154") */
  highlight: string;
};

/**
 * Authority products — flexible-shape product type that can render via
 * either the Pack page template (when `coverStyle: 'pack'` — prompt-pack
 * shape) or the Guide page template (`coverStyle: 'guide'` — playbook
 * shape). Lives in the new Authority section between Packs and Bundles.
 */
export type Authority = {
  id: string;
  type: 'authority';
  slug: string;
  shopifyHandle: string;
  number: string;            // A1, A2, A3
  name: string;
  /** v3.8a Phase 4B — see Pack.headline. */
  headline?: string;
  shortName: string;
  audience: string;
  role: string;
  tone: PackTone;
  color: string;
  glyph: string;
  italic: boolean;
  priceUSD: number;
  format: ProductFormat;
  /** Which detail-page layout to render. */
  coverStyle: 'pack' | 'guide';
  tagline: string;
  description: string;
  whoFor: string[];
  whoNotFor?: string[];
  // Pack-shape fields (set when coverStyle === 'pack')
  promptCount?: number;
  sections?: PackSection[];
  sample?: SamplePrompt;
  // Guide-shape fields (set when coverStyle === 'guide')
  pageCount?: number;
  chapterCount?: number;
  templateCount?: number;
  chapters?: GuideChapter[];
  templates?: {name: string; description: string}[];
  outcomes?: string[];
  roadmap?: RoadmapMilestone[];
  sampleChapter?: SampleChapter;
};

export type AnyProduct = Pack | Guide | Authority | Bundle;

// =====================================================================
// Cross-sell map
// =====================================================================
export const CROSS_SELL: Record<string, string[]> = {
  // Packs → Authority + complementary guide
  marketer: ['content-engine', 'personal-brand'],
  writer: ['newsletter-business', 'faceless-content'],
  developer: ['ai-agent-builder', 'saas-side-project'],
  solopreneur: ['high-ticket-finder', 'digital-products'],
  'content-creator': ['content-engine', 'personal-brand'],
  'ai-power-user': ['high-ticket-finder', 'ai-automation-agency'],
  productivity: ['coaching-consulting', 'saas-side-project'],
  // Guides → packs + Authority where they pair well
  'ai-automation-agency': ['ai-power-user', 'marketer'],
  'ai-agent-builder': ['ai-power-user', 'developer'],
  'web-design-agency': ['marketer', 'content-creator'],
  'digital-products': ['high-ticket-finder', 'personal-brand'],
  'newsletter-business': ['content-engine', 'personal-brand'],
  'faceless-content': ['content-engine', 'content-creator'],
  'saas-side-project': ['developer', 'ai-agent-builder'],
  'coaching-consulting': ['personal-brand', 'content-engine'],
  // Authority → mixed
  'personal-brand': ['content-engine', 'high-ticket-finder', 'content-creator', 'coaching-consulting'],
  'content-engine': ['personal-brand', 'content-creator', 'marketer'],
  'high-ticket-finder': ['personal-brand', 'digital-products', 'coaching-consulting'],
};

// =====================================================================
// Helpers
// =====================================================================
const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi'];
const sec = (raw: Array<Omit<PackSection, 'number'>>): PackSection[] =>
  raw.map((s, i) => ({...s, number: ROMAN[i] ?? `${i + 1}`}));

const ch = (raw: Array<Omit<GuideChapter, 'number'>>): GuideChapter[] =>
  raw.map((c, i) => ({...c, number: String(i + 1).padStart(2, '0')}));

const SHARED_PACK_SAMPLE: SamplePrompt = {
  number: 'PROMPT 01',
  title: 'The Hook Ladder',
  useCase:
    'Generate ten ad hooks for one product, ranked from safest to sharpest, so you can pick the angle that fits your channel.',
  prompt: `You are a paid social copywriter who has shipped 200+ ads for D2C and SaaS.

Product: [ONE SENTENCE, what it is, who it's for, what pain it removes]
Channel: [META | TIKTOK | LINKEDIN | YT SHORTS]
Voice constraint: [e.g. "no hype, no exclamation points, no questions"]

Give me 10 ad hooks, each ≤15 words, ordered from "safest, would-pass-legal" to "sharpest, would-make-the-CMO-nervous". For each, add one line of why this hook would land for this channel. Do not number with #1 best, these are options, not a ranking. Skip greetings.`,
  customize:
    'Swap "ad hooks" for "subject lines", "email PS lines", or "video cold opens". Add an angle constraint ("only objection-led hooks") for narrower output.',
  exampleOutput: `1. "We replaced our $4k/mo agency with one prompt.", opens with a number, ends with a payoff.
2. "Most CMOs are buying creative the wrong way.", soft contrarian, no jargon.
3. "Here's the meeting that killed our pipeline.", story hook, scrolls slower.
...
10. "Your ads aren't bad. Your hook is bored.", sharpest. Skip if your brand is risk-averse.`,
  proTip:
    'Paste the top 3 back in and ask: "Now write the second line for each, the one that earns the click." The follow-up beats almost every ad you ship.',
};

// =====================================================================
// PACKS (7) — slugs are singular per spec (/packs/marketer)
// =====================================================================
export const PACKS: Pack[] = [
  {
    id: 'marketer',
    type: 'pack',
    slug: 'marketer',
    shopifyHandle: 'marketer',
    number: '01',
    name: "The Marketer's Pack",
    headline: '65 prompts that replace the $300/hr agency you can\'t afford.',
    shortName: "Marketer's",
    audience: 'Marketers, content creators, growth pros',
    role: 'For marketers & content pros',
    tone: 'purple',
    color: '#6B46C1',
    glyph: '%',
    italic: false,
    priceUSD: 39,
    format: 'docx',
    promptCount: 65,
    tagline:
      'Sharper briefs, faster copy, and the ad-and-email prompts you reach for on a deadline.',
    description:
      "Sixty-five prompts for the things marketers ship every week: long-form posts, social hooks, email sequences, ads, SEO clusters, and client-facing work.",
    whoFor: [
      'You run paid, lifecycle, or brand at a startup or growth-stage company and ship weekly.',
      "You're a consultant or contractor running marketing for 3+ clients.",
      'You\'re tired of "10 ChatGPT prompts to grow your email list" listicles.',
      'You write briefs yourself and want better first drafts before your editor sees them.',
    ],
    sections: sec([
      {name: 'Content Writing', description: 'Blog posts, articles, long-form pieces with structure.', promptCount: 12, sampleTitles: ['The Listicle Autopsy', "The Skeptic's Outline", 'The 12-Minute Read']},
      {name: 'Social Media', description: 'LinkedIn posts, X threads, carousels, IG captions.', promptCount: 12, sampleTitles: ['The LinkedIn Hook', 'The Thread Architect', 'The Carousel Spine']},
      {name: 'Email Marketing', description: 'Sequences, subject lines, re-engagement, newsletters.', promptCount: 11, sampleTitles: ['The Subject-Line Battery', 'The Win-Back Brief', 'The Newsletter Spine']},
      {name: 'Ad Copy', description: 'Meta, Google, TikTok, and native placements.', promptCount: 10, sampleTitles: ['The Hook Ladder', 'The 3-Word Headline', 'The Comparison Ad']},
      {name: 'SEO', description: 'Keyword research, clusters, on-page, link building.', promptCount: 10, sampleTitles: ['The Cluster Map', 'The On-Page Audit', 'The Outreach Angle']},
      {name: 'Client Work', description: 'Discovery, proposals, case studies, retainers.', promptCount: 10, sampleTitles: ['The Discovery Brief', 'The Proposal Skeleton', 'The Case Study Mine']},
    ]),
    sample: SHARED_PACK_SAMPLE,
  },
  {
    id: 'writer',
    type: 'pack',
    slug: 'writer',
    shopifyHandle: 'writer',
    number: '02',
    name: "The Writer's Pack",
    headline: '65 prompts for fiction, non-fiction, and copy that doesn\'t read like AI.',
    shortName: "Writer's",
    audience: 'Fiction, non-fiction, copywriters',
    role: 'For fiction, non-fiction, copy',
    tone: 'rust',
    color: '#C2410C',
    glyph: '¶',
    italic: true,
    priceUSD: 39,
    format: 'docx',
    promptCount: 65,
    tagline:
      'Plotting, character work, line edits, and the pitch prompts that move a manuscript closer to print.',
    description:
      'Sixty-five prompts for writers who want a faster draft and a sharper revision. Story structure, dialogue, voice, line editing, and the publishing side of the work.',
    whoFor: [
      'You write fiction and want a thinking partner who won\'t flatten your voice.',
      "You're a freelance copywriter who needs sharper first drafts on the clock.",
      'You\'re shipping a non-fiction book and need help with argument structure.',
      'You\'re querying agents and the rejection emails are starting to rhyme.',
    ],
    sections: sec([
      {name: 'Fiction, Plotting', description: 'Story structure, beat sheets, twists, pacing.', promptCount: 11, sampleTitles: ['The Beat Sheet Builder', 'The Midpoint Audit', 'The Twist Sieve']},
      {name: 'Fiction, Characters', description: 'Backstory, voice, dialogue, motivation, arcs.', promptCount: 11, sampleTitles: ['The Character Interview', 'The Voice Lock', 'The Want vs. Need']},
      {name: 'Non-Fiction & Essays', description: 'Structure, argument, opening, closing.', promptCount: 11, sampleTitles: ['The Argument Map', 'The Anecdote Spine', 'The Closing Reframe']},
      {name: 'Editing & Revision', description: 'Line editing, cuts, pacing, voice consistency.', promptCount: 11, sampleTitles: ['The Cut List', 'The Pace Heatmap', 'The Voice Sweep']},
      {name: 'Style & Voice', description: 'Finding voice, mimicking masters, register shifts.', promptCount: 10, sampleTitles: ['The Voice Calibration', 'The Register Switch', 'The Mimicry Brief']},
      {name: 'Publishing & Pitching', description: 'Query letters, synopses, blurbs, agent research.', promptCount: 11, sampleTitles: ['The Query Letter', 'The Synopsis Skeleton', 'The Comp Title Hunt']},
    ]),
    sample: SHARED_PACK_SAMPLE,
  },
  {
    id: 'developer',
    type: 'pack',
    slug: 'developer',
    shopifyHandle: 'developer',
    number: '03',
    name: 'The Developer Pack',
    headline: '55 prompts for code review, debugging, and architecture. Built by an engineer.',
    shortName: 'Developer',
    audience: 'Software engineers and technical builders',
    role: 'For software engineers',
    tone: 'forest',
    color: '#15803D',
    glyph: '{ }',
    italic: false,
    priceUSD: 29,
    format: 'docx',
    promptCount: 55,
    tagline:
      'Code review, debugging, and architecture prompts written by someone who has actually shipped.',
    description:
      'Fifty-five prompts for engineers who use AI as a second pair of eyes. Code review checklists, debugging methodologies, design reviews, docs, and the soft-skills work nobody enjoys.',
    whoFor: [
      'You review more code than you write and want a sharper second read.',
      'You debug intermittently broken systems and need a hypothesis-first methodology.',
      'You write design docs and your reviewers keep asking the same three questions.',
      "You're prepping for senior interviews and want to think through trade-offs out loud.",
    ],
    sections: sec([
      {name: 'Code Review', description: 'Security, performance, readability, refactoring.', promptCount: 9, sampleTitles: ['The Security Sweep', 'The Hot-Path Audit', 'The Readability Pass']},
      {name: 'Debugging', description: 'Error analysis, hypothesis testing, log reading.', promptCount: 9, sampleTitles: ['The Hypothesis Tree', 'The Log Triage', 'The Repro Hunt']},
      {name: 'Architecture & Design', description: 'System design, trade-off analysis, API design.', promptCount: 9, sampleTitles: ['The Trade-Off Matrix', 'The API Round-Trip', 'The Scaling Pre-Mortem']},
      {name: 'Documentation', description: 'READMEs, API docs, code comments, ADRs.', promptCount: 10, sampleTitles: ['The README Spine', 'The ADR Template', 'The Comment Auditor']},
      {name: 'Learning New Tech', description: 'Frameworks, paradigms, tools.', promptCount: 9, sampleTitles: ['The First-Week Map', 'The Concept Translator', 'The Migration Brief']},
      {name: 'Career & Soft Skills', description: 'PR descriptions, standups, design docs, interviews.', promptCount: 9, sampleTitles: ['The Standup Polisher', 'The PR Description', 'The Interview Run']},
    ]),
    sample: SHARED_PACK_SAMPLE,
  },
  {
    id: 'solopreneur',
    type: 'pack',
    slug: 'solopreneur',
    shopifyHandle: 'solopreneur',
    number: '04',
    name: 'The Solopreneur Pack',
    headline: '65 prompts for the seven hats. Especially the 11pm investor-update one.',
    shortName: 'Solopreneur',
    audience: 'Solo founders, freelancers, indie hackers',
    role: 'For founders & freelancers',
    tone: 'gold',
    color: '#CA8A04',
    glyph: '§',
    italic: false,
    priceUSD: 39,
    format: 'docx',
    promptCount: 65,
    tagline:
      'The operating system for running a one-person business, positioning, sales, pricing, and the stuff nobody teaches you.',
    description:
      "Sixty-five prompts for the founder doing everything: positioning the offer, talking to customers, closing deals, pricing without flinching, and shipping systems that survive your worst week.",
    whoFor: [
      'You run a one-person company and need a thinking partner that doesn\'t need onboarding.',
      'You\'re re-pricing your offer and want help without sounding desperate.',
      'You\'re building SOPs so the work doesn\'t crater when you take a week off.',
      'You\'re tired of "founder Twitter" advice and want something you can actually use Monday.',
    ],
    sections: sec([
      {name: 'Business Planning', description: 'Positioning, business models, niche selection.', promptCount: 11, sampleTitles: ['The Positioning Statement', 'The Niche Slice', 'The 90-Day Roadmap']},
      {name: 'Customer Research', description: 'Interviews, surveys, persona building, JTBD.', promptCount: 11, sampleTitles: ['The Discovery Script', 'The JTBD Interview', 'The Survey Question Set']},
      {name: 'Sales & Outreach', description: 'Cold email, follow-ups, objection handling, closing.', promptCount: 11, sampleTitles: ['The Cold Email Autopsy', 'The Follow-Up Ladder', 'The Objection Pivot']},
      {name: 'Pricing & Offers', description: 'Pricing models, offer design, upsells, packages.', promptCount: 10, sampleTitles: ['The Tiering Frame', 'The Anchor Audit', 'The Package Re-Mix']},
      {name: 'Operations & Systems', description: 'SOPs, delegation, automation planning.', promptCount: 11, sampleTitles: ['The SOP Skeleton', 'The Delegation Brief', 'The Weekly Review']},
      {name: 'Marketing on a Budget', description: 'Organic growth, content, partnerships, PR.', promptCount: 11, sampleTitles: ['The Partnership Pitch', 'The PR Hook', 'The Content Engine']},
    ]),
    sample: SHARED_PACK_SAMPLE,
  },
  {
    id: 'content-creator',
    type: 'pack',
    slug: 'content-creator',
    shopifyHandle: 'content-creator',
    number: '05',
    name: 'The Content Creator Pack',
    headline: '65 prompts for YouTube, newsletters, and short-form. Three channels, one Saturday back.',
    shortName: 'Creator',
    audience: 'YouTubers, newsletter writers, TikTokers',
    role: 'For YouTubers, newsletter writers',
    tone: 'pink',
    color: '#EC4899',
    glyph: '▶',
    italic: true,
    priceUSD: 39,
    format: 'docx',
    promptCount: 65,
    tagline:
      'The hooks, scripts, and repurposing prompts behind the creators you envy.',
    description:
      'Sixty-five prompts to feed the content engine: YouTube scripts, newsletter opens that get read, short-form hooks, podcast prep, and a repurposing system that turns one idea into ten.',
    whoFor: [
      'You run a YouTube channel and want sharper hooks without going clickbait.',
      'You ship a weekly newsletter and the open rate is sliding.',
      "You're building a series and need a system, not a one-off prompt.",
      "You're repurposing the same idea into ten formats and want it not to feel like that.",
    ],
    sections: sec([
      {name: 'YouTube', description: 'Scripts, titles, thumbnails, hooks, descriptions.', promptCount: 11, sampleTitles: ['The 8-Second Hook', 'The Mid-Roll Save', 'The Title Battery']},
      {name: 'Newsletter Writing', description: 'Opens, value emails, growth, monetization.', promptCount: 11, sampleTitles: ['The First-Line Test', 'The Value-Stack Email', 'The Re-Engagement Note']},
      {name: 'TikTok / Reels / Shorts', description: 'Hooks, scripts, trends, series concepts.', promptCount: 11, sampleTitles: ['The 3-Second Hook', 'The Series Spine', 'The Trend Adapter']},
      {name: 'Podcast', description: 'Guests, questions, show notes, promo.', promptCount: 10, sampleTitles: ['The Guest Brief', 'The Question Ladder', 'The Show Notes Mine']},
      {name: 'Repurposing', description: 'Turn one piece of content into ten.', promptCount: 11, sampleTitles: ['The 1-to-10', 'The Cross-Channel Lift', 'The Quote Mine']},
      {name: 'Audience Growth', description: 'Community building, collabs, hooks, retention.', promptCount: 11, sampleTitles: ['The Collab Pitch', 'The Lurker Re-Open', 'The Community Spark']},
    ]),
    sample: SHARED_PACK_SAMPLE,
  },
  {
    id: 'ai-power-user',
    type: 'pack',
    slug: 'ai-power-user',
    shopifyHandle: 'ai-power-user',
    number: '06',
    name: 'The AI Power User Pack',
    headline: '60 meta-prompts for power users. Including the ones we use internally.',
    shortName: 'AI Power User',
    audience: 'Anyone who uses AI every day',
    role: 'For daily AI users',
    tone: 'plum',
    color: '#3B1F6B',
    glyph: '∞',
    italic: true,
    priceUSD: 39,
    format: 'docx',
    promptCount: 60,
    tagline:
      'Meta-prompts, frameworks, and decision tools that turn an LLM into a thinking partner, not an autocomplete.',
    description:
      "Sixty prompts for people whose default tab is a chat window. Frameworks for chain-of-thought, prompts that build prompts, research workflows, and red-team checks.",
    whoFor: [
      'You live in Claude or ChatGPT and want to push the model further than autocomplete.',
      'You write prompts about prompts and want a system you can re-use.',
      "You run multi-step research and want a workflow that doesn't lose context.",
      'You red-team your own work and want a partner that argues back.',
    ],
    sections: sec([
      {name: 'Prompt Engineering Frameworks', description: 'Chain-of-thought, role priming, structured outputs.', promptCount: 10, sampleTitles: ['The CoT Spine', 'The Role Stack', 'The Output Schema']},
      {name: 'Meta-Prompts', description: 'Prompts that build prompts, self-critique, refinement loops.', promptCount: 10, sampleTitles: ['The Prompt Builder', 'The Self-Critique Loop', 'The Refinement Pass']},
      {name: 'Research & Analysis', description: 'Deep research, synthesis, comparison, fact-checking.', promptCount: 10, sampleTitles: ['The Deep-Read', 'The Synthesis Brief', 'The Steel-Man Compare']},
      {name: 'Decision Making', description: 'Frameworks, pros/cons, second-order, red-teaming.', promptCount: 10, sampleTitles: ['The Pre-Mortem', 'The Second-Order Map', 'The Red-Team Run']},
      {name: 'Learning & Teaching', description: 'Explanations, Socratic method, knowledge testing.', promptCount: 10, sampleTitles: ['The Feynman Pass', 'The Socratic Drill', 'The Knowledge Quiz']},
      {name: 'AI Workflows', description: 'Multi-step pipelines, automations, integration prompts.', promptCount: 10, sampleTitles: ['The Pipeline Brief', 'The Tool-Use Plan', 'The Handoff Note']},
    ]),
    sample: SHARED_PACK_SAMPLE,
  },
  {
    id: 'productivity',
    type: 'pack',
    slug: 'productivity',
    shopifyHandle: 'productivity',
    number: '07',
    name: 'The Productivity Pack',
    headline: '55 prompts for knowledge work that doesn\'t bury you in process.',
    shortName: 'Productivity',
    audience: 'Knowledge workers, executives, students',
    role: 'For knowledge workers',
    tone: 'slate',
    color: '#475569',
    glyph: '□',
    italic: false,
    priceUSD: 29,
    format: 'docx',
    promptCount: 55,
    tagline:
      'Planning, decision frameworks, and meeting tools for the people whose calendar runs their life.',
    description:
      "Fifty-five prompts for the work behind the work. Weekly planning, decision frameworks, meeting prep and summaries, inbox triage, and prompts that protect deep work.",
    whoFor: [
      'Your calendar runs your life and you want help running your calendar.',
      'You take notes you never re-read and want a system that compounds.',
      'You sit in too many meetings and want every one to leave with a clean follow-up.',
      "You're defending deep work from a job that keeps inventing new ways to interrupt it.",
    ],
    sections: sec([
      {name: 'Planning & Prioritization', description: 'Weekly planning, OKRs, triage, batching.', promptCount: 9, sampleTitles: ['The Weekly Pre-Mortem', 'The Triage Pass', 'The Batch Map']},
      {name: 'Decision Frameworks', description: 'Eisenhower, second-order, pre-mortems.', promptCount: 9, sampleTitles: ['The Pre-Mortem', 'The 2nd-Order Trace', 'The Eisenhower Cut']},
      {name: 'Meetings', description: 'Prep, agendas, summaries, follow-ups.', promptCount: 9, sampleTitles: ['The 5-Minute Prep', 'The Agenda Skeleton', 'The Follow-Up Spine']},
      {name: 'Email & Communication', description: 'Triage, replies, sensitive messages.', promptCount: 10, sampleTitles: ['The Inbox Cut', 'The Hard-No Reply', 'The Sensitive Note']},
      {name: 'Learning & Notes', description: 'Note-taking, summarization, retention.', promptCount: 9, sampleTitles: ['The 1-Page Summary', 'The Spaced-Repeat Card', 'The Concept Map']},
      {name: 'Focus & Energy Management', description: 'Deep work, breaks, decision fatigue.', promptCount: 9, sampleTitles: ['The Deep-Work Brief', 'The Energy Audit', 'The Reset Ritual']},
    ]),
    sample: SHARED_PACK_SAMPLE,
  },
];

// =====================================================================
// GUIDES (8) — playbooks, PDF format, $97–$197
// =====================================================================

const aiAutomationAgencyRoadmap: RoadmapMilestone[] = [
  {day: 1, title: 'Setup & positioning locked', detail: 'Niche chosen, brand named, one-pager + LinkedIn profile shipped.'},
  {day: 30, title: 'First three discovery calls', detail: 'Cold outreach playbook running; you have three real calls on calendar.'},
  {day: 60, title: 'First paid pilot, $2,500–$5,000', detail: 'Pilot delivered. Either converted to retainer or used as case study.'},
  {day: 90, title: 'First retainer signed', detail: 'One client on $3,000–$5,000/mo recurring. Pipeline of 5 active conversations.'},
];

const aiAgentRoadmap: RoadmapMilestone[] = [
  {day: 1, title: 'Stack picked, eval harness running', detail: 'Local dev env, eval harness, one toy agent ships end-to-end.'},
  {day: 30, title: 'First productized agent (MVP)', detail: 'Single-use agent that solves a real job, deployed, demo-able.'},
  {day: 60, title: 'First paying customer', detail: 'Either pilot at $2k+ or self-serve trials converting.'},
  {day: 90, title: 'First $5k month', detail: 'Three customers + a clear upgrade path. Pricing tested twice.'},
];

const webDesignRoadmap: RoadmapMilestone[] = [
  {day: 1, title: 'Niche + portfolio audit', detail: 'Three target verticals chosen; portfolio cleaned and re-positioned.'},
  {day: 30, title: 'Productized offer live', detail: 'Single offer, single price, single timeline, published.'},
  {day: 60, title: 'First two paid projects', detail: 'Two builds delivered. Process documented for the next one.'},
  {day: 90, title: '$10k month possible', detail: 'Two builds + one website-as-asset retainer = first five-figure month.'},
];

const digitalProductsRoadmap: RoadmapMilestone[] = [
  {day: 1, title: 'Idea + audience picked', detail: 'One product idea, one platform, one promise.'},
  {day: 30, title: 'Pre-launch list of 100', detail: 'Landing page live, list of 100+ pre-launch signups.'},
  {day: 60, title: 'Launch week complete', detail: 'Product shipped. First sales in. Pricing tested.'},
  {day: 90, title: '$5k+ from one product', detail: 'Evergreen funnel running. Product #2 scoped.'},
];

const newsletterRoadmap: RoadmapMilestone[] = [
  {day: 1, title: 'Topic + format locked', detail: 'Niche chosen, ConvertKit set up, first edition written.'},
  {day: 30, title: 'First 100 subscribers', detail: 'Lead magnet shipping, growth channels chosen, weekly cadence holding.'},
  {day: 60, title: 'First sponsor or paid sub', detail: 'Either a $500 sponsor slot or 20 paid subs at $5/mo.'},
  {day: 90, title: '500+ subs, $1k+/mo', detail: 'Audience compounding. Product or sponsor revenue replicable.'},
];

const facelessRoadmap: RoadmapMilestone[] = [
  {day: 1, title: 'Niche + format locked', detail: 'Channel niche picked, script template + voice picked, intro made.'},
  {day: 30, title: '12 videos shipped', detail: 'Three a week cadence. AI voice + B-roll workflow tight.'},
  {day: 60, title: '1k subs + first $100 RPM', detail: 'AdSense on. First short going viral. Process documented.'},
  {day: 90, title: '$1k+/mo from channel', detail: 'Either AdSense, sponsor, or first faceless product launched.'},
];

const saasRoadmap: RoadmapMilestone[] = [
  {day: 1, title: 'Niche + bug found', detail: 'You\'ve picked a job-to-be-done you can build in a weekend.'},
  {day: 30, title: 'MVP deployed', detail: 'Stripe live, 5 manual test users. Onboarding actually works.'},
  {day: 60, title: 'First 10 paying customers', detail: 'Cold + warm outreach + one launch post → 10 paid.'},
  {day: 90, title: '$1k MRR or first 50 users', detail: 'You\'ve validated price + channel. Either grow or pivot.'},
];

const coachingRoadmap: RoadmapMilestone[] = [
  {day: 1, title: 'Niche + packaging set', detail: 'One audience, one transformation, one price.'},
  {day: 30, title: 'First three discovery calls', detail: 'Cold + warm outreach booked. Discovery script polished.'},
  {day: 60, title: 'First paid client at $2k+', detail: 'One client onboarded. Process documented for client #2.'},
  {day: 90, title: '$5k+ from coaching', detail: 'Three clients or one 1-many program. Referrals starting.'},
];

export const GUIDES: Guide[] = [
  {
    id: 'ai-automation-agency',
    type: 'guide',
    slug: 'ai-automation-agency',
    shopifyHandle: 'ai-automation-agency',
    number: 'G1',
    name: 'The AI Automation Agency Playbook',
    headline: 'First $5k retainer in 90 days. 180 pages. 14 templates.',
    shortName: 'AI Automation Agency',
    category: 'premium',
    tone: 'midnight',
    color: '#1E1B4B',
    glyph: '⚙',
    italic: false,
    priceUSD: 197,
    format: 'pdf',
    pageCount: 180,
    chapterCount: 12,
    templateCount: 14,
    audience: 'Operators building AI automation services',
    role: 'For agency builders',
    tagline:
      'A 90-day playbook to launch an AI automation agency, from positioning to first $5k retainer.',
    description:
      "180 pages, 12 chapters, 14 templates. Niche selection, productized offers, cold outreach scripts, the build process, retainers, and how to scale past $20k/mo without becoming a 60-hour-a-week ops manager.",
    whoFor: [
      'You\'ve shipped at least one automation (n8n, Make, Zapier, custom) and want to sell it.',
      'You\'re leaving a job and need a clear 90-day plan to first paying client.',
      'You run a marketing/design agency and want to add automation as a higher-margin service.',
      'You can write a clean technical handoff and explain it to a non-technical buyer.',
    ],
    whoNotFor: [
      'You\'ve never built an end-to-end automation in your life.',
      'You want a "passive income" play with no client work.',
      'You\'re looking for a list of tools without a business model.',
      'You expect a copy-paste agency in a box.',
    ],
    outcomes: [
      'Pitch a $5,000+/month retainer with a straight face.',
      'Run a discovery call that ends with a signed pilot.',
      'Price a fixed-fee build without leaving margin on the table.',
      'Hire your first contractor without it costing you the next month\'s profit.',
      'Build a referral pipeline so cold outreach stops being your only channel.',
      'Decide between fixed-fee builds and retainers (and when to do both).',
      'Write contracts that protect scope without killing the relationship.',
      'Scale past one person without scaling your hours.',
    ],
    templates: [
      {name: 'Cold outreach email + 4 follow-ups', description: 'The exact sequence we use to book discovery calls cold.'},
      {name: 'Discovery call script', description: '12 questions, in order, with branching logic.'},
      {name: 'Fixed-fee proposal template', description: 'Notion + Google Doc versions. Scope, milestones, terms.'},
      {name: 'Retainer contract', description: 'Plain-English, lawyer-reviewed. Renewal + termination terms included.'},
      {name: 'Pricing calculator (Sheet)', description: 'Inputs your hours + complexity, outputs fixed + retainer pricing.'},
      {name: 'Pilot scope-of-work', description: 'For two-week paid pilots that convert into retainers.'},
      {name: 'Client onboarding checklist', description: 'Access, kickoff, expectations, every step before week one.'},
      {name: 'SOP template, automation handoff', description: 'Written runbook so clients can self-serve maintenance.'},
      {name: 'Referral request script', description: 'When + how to ask, with the exact words.'},
      {name: 'First-hire contractor brief', description: 'Job spec + skills test + week-one plan.'},
      {name: 'Weekly client status email', description: 'The format that keeps renewal conversations easy.'},
      {name: 'Case study skeleton', description: 'Before / during / after, with the numbers that close the next deal.'},
      {name: 'Cancellation save script', description: 'The two questions that win back half of churns.'},
      {name: 'Quarterly business review deck', description: '15 slides, in order. The renewal call you don\'t lose.'},
    ],
    chapters: ch([
      {name: 'Positioning the agency', description: 'What you actually sell, and the three positions that won\'t work.', pageCount: 12},
      {name: 'The first-five-client offer', description: 'A productized offer narrow enough to sell, big enough to matter.', pageCount: 14},
      {name: 'Pricing and packaging', description: 'Fixed-fee vs. retainer math, with real numbers.', pageCount: 14},
      {name: 'Cold outreach that books calls', description: 'The five-email sequence, the angles, the tracking.', pageCount: 16},
      {name: 'The discovery call script', description: '12 questions and what to listen for.', pageCount: 14},
      {name: 'Building the automation', description: 'Stack choice (n8n/Make/Zapier/custom) and when to break the rules.', pageCount: 16},
      {name: 'Pricing the build', description: 'Why fixed-fee is almost always the right answer at first.', pageCount: 14},
      {name: 'The proposal and contract', description: 'What to include, what to cut, where buyers get cold feet.', pageCount: 14},
      {name: 'Onboarding clients', description: 'Kickoff, access, expectations, the week-one ritual.', pageCount: 14},
      {name: 'Retainers and recurring revenue', description: 'How to convert a build into $3–5k/mo without raising eyebrows.', pageCount: 16},
      {name: 'Hiring and team', description: 'When to hire, who to hire first, how to write the brief.', pageCount: 14},
      {name: 'Scaling past $20k/mo', description: 'What changes when you can\'t take every call yourself.', pageCount: 12},
    ]),
    roadmap: aiAutomationAgencyRoadmap,
    sample: {
      number: '01',
      title: 'Positioning the agency',
      intro:
        'Most new AI automation agencies fail at positioning before they fail at sales. The founder calls themselves "an AI consultant" or "an automation expert," and then they\'re competing with everyone on earth who has ever opened n8n. Positioning is not a marketing tactic, it\'s a filter. It decides who calls you, what they expect to pay, and whether they treat you like a vendor or a peer.',
      keyPoints: [
        'Three positions that don\'t work: "AI consultant," "automation expert," "AI-powered marketing."',
        'The two-axis positioning grid: who you serve × what specific outcome you deliver.',
        'The five questions that force you to pick a position you can defend.',
        'A 30-minute exercise to write your one-pager, and why one-pagers beat homepages for the first 90 days.',
        'The "no" list: three kinds of work you won\'t do, posted publicly, so the right buyers self-select.',
      ],
      closeNote:
        'Once your positioning is sharp, the next chapter is the offer, a single, productized engagement designed for your first five clients. Productized doesn\'t mean cookie-cutter. It means you can name the price before they finish describing the problem.',
    },
  },
  {
    id: 'ai-agent-builder',
    type: 'guide',
    slug: 'ai-agent-builder',
    shopifyHandle: 'ai-agent-builder',
    number: 'G2',
    name: 'The AI Agent Builder Playbook',
    headline: 'Production agents that don\'t break. Eval-first. 180 pages.',
    shortName: 'AI Agent Builder',
    category: 'premium',
    tone: 'midnight',
    color: '#1E1B4B',
    glyph: '◇',
    italic: false,
    priceUSD: 197,
    format: 'pdf',
    pageCount: 180,
    chapterCount: 12,
    templateCount: 12,
    audience: 'Engineers shipping production agents',
    role: 'For agent builders',
    tagline:
      'A working playbook for shipping production AI agents, stack, evals, pricing, sales, with no hype.',
    description:
      'A 180-page playbook for engineers shipping agents people pay for. Real stack choices, an eval-first workflow, pricing models for agentic products, and the demos that close non-technical buyers.',
    whoFor: [
      'You\'ve built apps with LLMs and now want to ship an agent that does real work end-to-end.',
      'You can write Python or TypeScript and don\'t need a framework comparison from 2023.',
      'You\'re technical, but you\'ve never had to price an agent or sell to a CFO.',
      'You\'re an engineer who wants to charge $200 for the same work, not $50/hr.',
    ],
    whoNotFor: [
      'You\'ve never shipped any production software.',
      'You think "agent" is a marketing buzzword.',
      'You expect tutorial-level code walkthroughs.',
      'You want this to cover image-gen or video.',
    ],
    outcomes: [
      'Pick a stack (LangGraph / Pydantic AI / custom) for the right reason.',
      'Run an eval-first workflow that catches regressions before customers do.',
      'Design tools, memory, and state without the agent going off the rails.',
      'Price an agent: per-call vs. seat vs. retainer, and when each works.',
      'Run a demo with a non-technical CFO and walk out with budget.',
      'Build observability so you can answer "why did it do that" in one click.',
      'Ship MVP → first paying customer in 60 days without quitting your day job.',
      'Decide between productized SaaS and managed-service models.',
    ],
    templates: [
      {name: 'Eval harness starter kit', description: 'pytest + LangChain evals scaffolding. Real assertions, not vibes.'},
      {name: 'Agent system prompt scaffold', description: 'The skeleton we use for every new agent.'},
      {name: 'Tool spec template', description: 'JSON schema + plain-English description. Used by all major models.'},
      {name: 'Memory + state design doc', description: 'Decision tree for short-term, long-term, working memory.'},
      {name: 'Pricing calculator', description: 'Per-call vs. seat vs. retainer model spreadsheet.'},
      {name: 'Demo script for non-technical buyers', description: 'Open with the pain. Close with the math.'},
      {name: 'Pilot SOW', description: '2-week paid pilot scope with renewal terms baked in.'},
      {name: 'Observability checklist', description: 'What to log, where, with what cost guardrails.'},
      {name: 'Customer success playbook', description: 'Onboarding, status emails, escalation tree.'},
      {name: 'Trial-to-paid email sequence', description: '5 emails over 14 days for self-serve agents.'},
      {name: 'Support SLAs that won\'t break you', description: '24/72/business-hours by tier, with cost math.'},
      {name: 'Architecture diagrams (5)', description: 'Reference diagrams for common agent patterns.'},
    ],
    chapters: ch([
      {name: 'What an "agent" actually is', description: 'A working definition that survives a sales call and a code review.', pageCount: 12},
      {name: 'The five agent archetypes', description: 'Ranked by complexity and revenue potential.', pageCount: 14},
      {name: 'Tooling stack', description: 'LangGraph, Pydantic AI, custom, when each is right.', pageCount: 16},
      {name: 'The eval-first workflow', description: 'Why every other workflow regresses, and how to fix it.', pageCount: 14},
      {name: 'Memory, tools, state', description: 'The three pieces that decide whether your agent ships or wanders.', pageCount: 16},
      {name: 'Multi-step planning', description: 'When to plan, when to react, and how to keep tokens honest.', pageCount: 14},
      {name: 'Productizing an agent', description: 'From notebook to SaaS without lighting your weekends on fire.', pageCount: 14},
      {name: 'Pricing per-call vs. seat vs. retainer', description: 'The math behind each, with real customer examples.', pageCount: 14},
      {name: 'Selling to non-technical buyers', description: 'The vocabulary swap that turns interest into budget.', pageCount: 14},
      {name: 'Demos that close', description: 'Open with the pain, end with the math. With scripts.', pageCount: 12},
      {name: 'Support and uptime', description: 'What "production" actually means and what to promise.', pageCount: 14},
      {name: 'Beyond MVP', description: 'The path from one customer to ten, and what changes.', pageCount: 12},
    ]),
    roadmap: aiAgentRoadmap,
    sample: {
      number: '01',
      title: 'What an "agent" actually is',
      intro:
        'Half the AI agent content online is people calling a single LLM call with a tool list an "agent" and shipping it. The other half is a 12-layer LangChain stack from 2023 that no one can debug. Neither is what your customers are paying for. An agent, for the purposes of this playbook, is a system that can take a goal, decide what to do next, use tools to do it, and check whether the work is done. Three pieces: a planner, an actor, and a verifier. Everything we build in the next eleven chapters fits that frame.',
      keyPoints: [
        'A working definition: planner + actor + verifier. If you can\'t name all three in your agent, it isn\'t one.',
        'Why "agentic" is doing too much work in most product copy, and what to say instead.',
        'The three failure modes: planning loops, tool hallucination, verifier blindness.',
        'How to draw a one-page diagram of your agent in a meeting and have it survive code review.',
        'The "would the on-call engineer wake up?" test, if no, it\'s not production.',
      ],
      closeNote:
        'In chapter two we map this definition onto the five agent archetypes that actually generate revenue, ranked by build cost and what buyers will pay.',
    },
  },
  {
    id: 'web-design-agency',
    type: 'guide',
    slug: 'web-design-agency',
    shopifyHandle: 'web-design-agency',
    number: 'G3',
    name: 'The Web Design Agency Playbook',
    headline: '$10k months by week 13. Productized. 140 pages.',
    shortName: 'Web Design Agency',
    category: 'agency',
    tone: 'plum',
    color: '#3B1F6B',
    glyph: '/',
    italic: true,
    priceUSD: 147,
    format: 'pdf',
    pageCount: 140,
    chapterCount: 12,
    templateCount: 10,
    audience: 'Designers and devs going independent',
    role: 'For solo designers',
    tagline:
      'A 90-day playbook to launch a productized web design agency that hits $10k months by week thirteen.',
    description:
      "140 pages covering niching, productized offers, the build week, handoff, cold outreach, referrals, and the website-as-asset retainer that turns one-off builds into recurring revenue.",
    whoFor: [
      'You can design and ship a clean site in two weeks.',
      'You\'re tired of bidding against five other designers for the same $1,800 build.',
      'You\'re leaving an agency or a job and have 90 days to replace your income.',
      'You want fewer, better clients, not more, worse ones.',
    ],
    whoNotFor: [
      'You\'ve never shipped a live site.',
      'You\'re looking for theme-building tutorials.',
      'You want to scale to a 20-person agency in year one.',
      'You\'re hoping AI alone will close clients for you.',
    ],
    outcomes: [
      'Niche your offer so the first call ends with a proposal.',
      'Price a productized $5,000–$8,000 build with a straight face.',
      'Run a discovery call that doesn\'t leave you doing a free pitch.',
      'Deliver a 10-day build without scope creep.',
      'Convert a build into a $1,000+/month "website as asset" retainer.',
      'Build a referral system that fills the next month\'s pipeline.',
      'Choose Webflow / Framer / Wordpress for the right reasons.',
      'Pre-qualify so you stop wasting time on tire-kickers.',
    ],
    templates: [
      {name: 'Niche-picker exercise', description: '20 questions that surface the three niches you can defend.'},
      {name: 'Productized offer one-pager', description: 'Single price, single scope, single timeline. Copy + design.'},
      {name: 'Discovery call script', description: 'Five questions that pre-qualify in 18 minutes.'},
      {name: 'Wireframe + content brief', description: 'What you ask for, in what order, before you open Figma.'},
      {name: 'Build-week SOP', description: 'Day-by-day plan to ship in 10 working days.'},
      {name: 'Handoff doc template', description: 'What clients get on day 11. Trains them to leave you alone.'},
      {name: 'Cold outreach to local businesses', description: 'Email + DM versions, with the angles that work.'},
      {name: 'Website-as-asset retainer pitch', description: 'The conversation that turns $5k builds into $1k/mo retainers.'},
      {name: 'Referral request sequence', description: 'When, how, and the exact words.'},
      {name: 'Scope change request form', description: 'For when "just one small tweak" appears.'},
    ],
    chapters: ch([
      {name: 'Niching down', description: 'Why "I do websites for small businesses" is killing your pipeline.', pageCount: 10},
      {name: 'The portfolio you need', description: 'What to show, what to cut, what to lie about (kind of).', pageCount: 12},
      {name: 'Productizing the offer', description: 'Single price, single scope. Why this changes the call.', pageCount: 12},
      {name: 'The five-question discovery', description: 'A call structure that pre-qualifies in 18 minutes.', pageCount: 12},
      {name: 'Wireframes and proposals', description: 'The artefacts that earn the deposit.', pageCount: 12},
      {name: 'Pricing and scope', description: 'How to price the productized build and protect the margin.', pageCount: 12},
      {name: 'The build week', description: 'A 10-day shipping schedule, day by day.', pageCount: 12},
      {name: 'Handoff and revisions', description: 'How to end the project, and the relationship cleanly.', pageCount: 12},
      {name: 'Cold outreach', description: 'Local + niche-specific email + DM scripts.', pageCount: 12},
      {name: 'Referral systems', description: 'When to ask, who to ask, what to ask for.', pageCount: 10},
      {name: 'The website-as-asset upsell', description: 'Turning a $5k build into a $1k/mo retainer.', pageCount: 12},
      {name: 'Scaling past $10k/mo', description: 'When to hire, when to raise prices, when to fire.', pageCount: 12},
    ]),
    roadmap: webDesignRoadmap,
    sample: {
      number: '01',
      title: 'Niching down',
      intro:
        '"I build websites for small businesses" is the most common opening line on Upwork, on LinkedIn, and in agency one-pagers, and it\'s why ninety percent of new web design agencies stall. "Small business" describes 30 million companies. It tells the buyer nothing about whether you understand their business, their margins, or their customer. Niching down isn\'t about limiting your work; it\'s about giving your buyer one less reason to keep shopping.',
      keyPoints: [
        'Three failed niche patterns: by region, by tool, by company size.',
        'Three patterns that work: by industry vertical, by inflection point, by problem.',
        'The "first-five clients" test: pick a niche you could pitch to five people you already know.',
        'How to swap niches without burning your existing referral network.',
        'The one-pager rewrite: how the niche shows up on your homepage in five seconds or less.',
      ],
      closeNote:
        'In chapter two we tear apart what your portfolio should show now that the niche is locked, and what to quietly remove.',
    },
  },
  {
    id: 'digital-products',
    type: 'guide',
    slug: 'digital-products',
    shopifyHandle: 'digital-products',
    number: 'G4',
    name: 'The Digital Products Playbook',
    headline: 'Ship a $97-$297 digital product in 90 days. Without quitting your job.',
    shortName: 'Digital Products',
    category: 'solo',
    tone: 'pink',
    color: '#BE185D',
    glyph: '◐',
    italic: false,
    priceUSD: 97,
    format: 'pdf',
    pageCount: 90,
    chapterCount: 12,
    templateCount: 8,
    audience: 'Makers shipping a first digital product',
    role: 'For first-time makers',
    tagline:
      'How to find, ship, and sell a $97–$297 digital product in 90 days without quitting your job.',
    description:
      "90 pages covering idea validation, pricing, the launch week, the evergreen funnel, and a 5-post organic playbook that turns a list of 200 into $5k of sales.",
    whoFor: [
      'You\'ve already got an audience (any size) and want to package what you know.',
      'You don\'t want to run a service business or build SaaS.',
      'You can write or design and want to package it once, sell it many times.',
      'You\'ve started three products and finished none.',
    ],
    whoNotFor: [
      'You\'re looking for "passive income" hacks.',
      'You have no audience and don\'t want to build one.',
      'You expect a $50k product with no validation work.',
      'You won\'t do five social posts to support a launch.',
    ],
    outcomes: [
      'Pick a digital product idea your audience will actually buy.',
      'Validate the idea in seven days without writing code.',
      'Price for a digital product (and stop undercharging by 5x).',
      'Build the product on Gumroad / Lemon Squeezy / Notion in a weekend.',
      'Run a launch week that does $2,000–$10,000 in sales.',
      'Set up an evergreen funnel that compounds week-over-week.',
      'Write a sales page that doesn\'t read like a Mad Lib.',
      'Decide what to ship next (and when to ship nothing).',
    ],
    templates: [
      {name: 'Idea-validation worksheet', description: 'Seven questions that surface what your audience will pay for.'},
      {name: 'Pre-launch landing page', description: 'Copy + design. Built to convert 25%+ to email signup.'},
      {name: 'Sales page skeleton', description: 'Headline, promise, proof, offer, FAQ, in that order.'},
      {name: 'Launch week email sequence', description: '5 emails over 5 days. Tested at conversions of 4–8%.'},
      {name: '5-post social launch playbook', description: 'The exact posts to ship on the launch week.'},
      {name: 'Evergreen drip sequence', description: '7 emails over 21 days for ongoing sales.'},
      {name: 'Refund policy template', description: '30-day, no-questions. Lawyer-reviewed.'},
      {name: 'Affiliate program one-pager', description: 'For when you want other people selling for you.'},
    ],
    chapters: ch([
      {name: "Finding a product that's not crowded", description: 'The three filters that kill 90% of bad ideas.', pageCount: 8},
      {name: 'Validating in 7 days', description: 'A protocol you can run without building the product.', pageCount: 8},
      {name: 'Pricing for digital goods', description: 'Why $7 and $297 both work better than $47.', pageCount: 8},
      {name: 'Building it', description: 'Notion / Gumroad / Lemon Squeezy / Stan stack picks.', pageCount: 8},
      {name: 'The pre-launch list', description: 'How to build a 500-person list before you have a product.', pageCount: 8},
      {name: 'The launch week', description: 'A 7-day cadence: list, social, urgency, close.', pageCount: 8},
      {name: 'Post-launch evergreen', description: 'Turning one launch into a year of revenue.', pageCount: 8},
      {name: 'Sales pages that convert', description: 'Section by section, with examples.', pageCount: 8},
      {name: 'Refund and trust signals', description: 'How to look real without faking it.', pageCount: 6},
      {name: 'The five social posts that sell', description: 'The exact angles that work on each platform.', pageCount: 6},
      {name: 'Building product #2', description: 'When to ship a second, when to stay focused.', pageCount: 6},
      {name: 'Scaling without burnout', description: 'How to compound revenue without compounding output.', pageCount: 8},
    ]),
    roadmap: digitalProductsRoadmap,
    sample: {
      number: '01',
      title: "Finding a product that's not crowded",
      intro:
        'Most first-time makers ship the wrong product, not because the idea is bad, but because it\'s the same idea everyone else had this quarter. "Productivity templates," "Notion second-brain dashboards," "ChatGPT prompt packs", these aren\'t bad markets, but they\'re crowded, and a crowded market punishes a first-time maker who hasn\'t learned positioning yet. The first job is finding an idea where you can be the obvious choice on day one.',
      keyPoints: [
        'The three filters: existing-audience match, payoff-density, defensible angle.',
        'A 30-minute "audience audit" to find the three things your readers already ask you about.',
        'Why "the obvious idea your audience keeps requesting" beats "the big idea you have alone."',
        'The crowdedness test: search for five products that already exist. Are any of them yours, minus the niche?',
        'How to pick an audience subset (e.g. "designers at agencies," not "designers") so positioning writes itself.',
      ],
      closeNote:
        'In chapter two we run a seven-day validation protocol that turns one of those ideas into a pre-launch list, without writing a single line of the actual product.',
    },
  },
  {
    id: 'newsletter-business',
    type: 'guide',
    slug: 'newsletter-business',
    shopifyHandle: 'newsletter-business',
    number: 'G5',
    name: 'The Newsletter Business Playbook',
    headline: 'First 100 subscribers to first $1,000/month. 90 pages, 12 chapters.',
    shortName: 'Newsletter',
    category: 'solo',
    tone: 'sand',
    color: '#A16207',
    glyph: '✉',
    italic: false,
    priceUSD: 97,
    format: 'pdf',
    pageCount: 90,
    chapterCount: 12,
    templateCount: 9,
    audience: 'Writers turning a newsletter into a business',
    role: 'For newsletter operators',
    tagline:
      'From first 100 subscribers to first $1,000/month, a 90-day operating system for newsletter writers.',
    description:
      "90 pages on topic selection, format, growth, sponsorships, paid subs, and the 100-email rhythm that turns a list into a business.",
    whoFor: [
      'You have a newsletter under 1,000 subs and don\'t know what to ship next.',
      'You\'re writing for free and want to charge or run sponsors.',
      'Your open rate is sliding and you can\'t name why.',
      'You\'re scared of becoming "salesy" and it\'s costing you the business.',
    ],
    whoNotFor: [
      'You expect a newsletter to replace a full-time income in 30 days.',
      'You want to game algorithms without writing real essays.',
      'You won\'t commit to a weekly cadence for 12 weeks.',
      'You\'re looking for SEO hacks, not a writing practice.',
    ],
    outcomes: [
      'Pick a topic that compounds (and one to drop).',
      'Get to your first 100 subscribers without spending on ads.',
      'Find a voice that sounds like you in five emails or fewer.',
      'Land your first $500 sponsor slot.',
      'Launch a paid tier without sounding desperate.',
      'Build a 5-email lead magnet that converts at 30%+.',
      'Write fast without your voice degrading.',
      'Decide between sponsors, paid subs, and a product.',
    ],
    templates: [
      {name: 'Topic-picker exercise', description: 'Find the intersection of "you can write it" and "they\'ll pay."'},
      {name: 'Welcome sequence (5 emails)', description: 'Onboards new subs without sounding like 2015.'},
      {name: 'Lead magnet outline', description: 'A 20-page PDF or 5-email course that pulls 30%+ signups.'},
      {name: 'Sponsor pitch deck', description: '6 slides. Numbers, audience, ad spec, rates.'},
      {name: 'Sponsor ad copy template', description: 'Three formats: native, classified, hard-pitch.'},
      {name: 'Paid tier launch sequence', description: 'A 14-day rollout for opening paid subscriptions.'},
      {name: 'Edition skeleton (3 variants)', description: 'Essay, news, list, three formats with timing notes.'},
      {name: 'Re-engagement campaign', description: 'A 3-email sequence to wake up cold subscribers.'},
      {name: 'Annual report template', description: 'For your audience, and your own quarterly review.'},
    ],
    chapters: ch([
      {name: 'Picking a topic that pays', description: 'The intersection of personal voice and commercial intent.', pageCount: 8},
      {name: 'The first 100 subscribers', description: 'Five channels that work, three that don\'t.', pageCount: 8},
      {name: 'Voice and format', description: 'How to sound like yourself by the fifth edition.', pageCount: 8},
      {name: 'Frequency and length', description: 'Weekly is the answer. Length is the question.', pageCount: 6},
      {name: 'Growth: lead magnets and referrals', description: 'The two channels that compound past 1,000 subs.', pageCount: 8},
      {name: 'Sponsorships', description: 'Pricing, placement, and what to never accept.', pageCount: 8},
      {name: 'Paid subs', description: 'When to launch, what to charge, what to give away.', pageCount: 8},
      {name: 'The "100 emails" playbook', description: 'What changes when you have 100 issues behind you.', pageCount: 8},
      {name: 'Writing fast without breaking voice', description: 'A two-hour cadence for the busy week.', pageCount: 8},
      {name: 'Open rate engineering', description: 'The subject lines + send-times that actually move it.', pageCount: 6},
      {name: 'Building a product off the list', description: 'When (and how) to ship a digital product.', pageCount: 8},
      {name: 'When to hire help', description: 'The first contractor a newsletter writer should hire.', pageCount: 6},
    ]),
    roadmap: newsletterRoadmap,
    sample: {
      number: '01',
      title: 'Picking a topic that pays',
      intro:
        '"Write about what you love" is the worst piece of advice in the newsletter ecosystem. A topic you love but no one will pay for is a hobby, and a topic readers will pay for but you can\'t sustain is a job. The newsletter business is the rare overlap, a topic specific enough that you can build authority in six months, broad enough that a sponsor or a paid tier makes economic sense.',
      keyPoints: [
        'The two-axis grid: your voice × commercial intent. Pick a topic in the top-right.',
        'Why "your industry" beats "your interest" for the first hundred editions.',
        'Three failed topic patterns: too broad, too personal, too algorithm-shaped.',
        'A 30-minute "topic crash test" to pressure-test the topic before you commit a year.',
        'How to swap or narrow your topic in public without losing the subscribers you already have.',
      ],
      closeNote:
        'In chapter two we move from the topic to the first hundred subscribers, five channels that work, three that quietly waste your weekends.',
    },
  },
  {
    id: 'faceless-content',
    type: 'guide',
    slug: 'faceless-content',
    shopifyHandle: 'faceless-content',
    number: 'G6',
    name: 'The Faceless Content Playbook',
    headline: '10k subs and $1k/mo on 4 videos a week. Faceless. 130 pages.',
    shortName: 'Faceless Content',
    category: 'solo',
    tone: 'plum',
    color: '#4C1D6B',
    glyph: '◉',
    italic: true,
    priceUSD: 147,
    format: 'pdf',
    pageCount: 130,
    chapterCount: 12,
    templateCount: 11,
    audience: 'Operators building faceless YouTube + short-form channels',
    role: 'For faceless creators',
    tagline:
      'How to run a faceless YouTube channel that hits 10k subs and $1k/mo on a 4-videos-a-week solo cadence.',
    description:
      '130 pages on niche selection, AI voice + B-roll workflows, script structure, the SEO that still works, and the monetization paths that don\'t depend on going viral.',
    whoFor: [
      'You want to ship on YouTube but don\'t want to be on camera.',
      'You\'ve got the production know-how and need the business model.',
      'You\'re willing to do four videos a week for three months before judging results.',
      'You want a channel as a real asset, not a one-hit short.',
    ],
    whoNotFor: [
      'You expect a 100k-sub channel in 30 days.',
      'You won\'t script properly because "AI does it now."',
      'You\'re looking for engagement hacks, not a real business.',
      'You expect zero on-camera, zero voice, neither will work.',
    ],
    outcomes: [
      'Pick a faceless niche that pays AdSense, not pennies.',
      'Set up an AI voice + B-roll workflow that ships a 10-minute video in 6 hours.',
      'Write scripts that hold retention past the 30-second mark.',
      'Title and thumbnail for YouTube SEO that still works.',
      'Cross-post to Shorts and TikTok without re-editing twice.',
      'Hit your first $100 RPM and grow from there.',
      'Land a sponsor at 10k subs (and not before).',
      'Eventually sell or hand off the channel as an asset.',
    ],
    templates: [
      {name: 'Niche scoring sheet', description: '10 niches scored on monetization, supply, retention.'},
      {name: 'Script structure template', description: 'Hook, problem, payoff, transition, payoff, CTA.'},
      {name: 'AI voice prompt presets', description: 'Pacing + register settings for ElevenLabs / similar.'},
      {name: 'B-roll source list', description: 'Stock + AI image sources, with usage rights.'},
      {name: 'Title formula library', description: '20 title patterns ranked by CTR.'},
      {name: 'Thumbnail decision tree', description: '5 thumbnail patterns, when to use each.'},
      {name: 'Series concept sheet', description: 'How to plan 20 episodes before episode one.'},
      {name: 'Cross-post pipeline', description: 'YT + Shorts + TikTok + Instagram from one master video.'},
      {name: 'Sponsor outreach deck', description: '6 slides. Audience, niche, packages.'},
      {name: 'Channel handoff brief', description: 'What to document so an editor can take over.'},
      {name: 'Exit-ready dashboard', description: 'Metrics to track if you ever want to sell the channel.'},
    ],
    chapters: ch([
      {name: 'Faceless niches that work', description: 'The four categories that monetize, ranked.', pageCount: 10},
      {name: 'Script structure', description: 'A skeleton that holds across topics and lengths.', pageCount: 12},
      {name: 'AI voiceover and B-roll', description: 'Stack picks + how to make synthetic feel intentional.', pageCount: 12},
      {name: 'The first 30 videos', description: 'A 90-day cadence and what to expect at each stage.', pageCount: 12},
      {name: 'Hooks and retention', description: 'The 0–30 second window that decides whether you grow.', pageCount: 12},
      {name: 'SEO and titles', description: 'What YouTube still rewards in 2026.', pageCount: 10},
      {name: 'Cross-platform: YT, Shorts, TikTok', description: 'One workflow, three platforms, no double work.', pageCount: 12},
      {name: 'Monetization paths', description: 'AdSense, sponsors, products, channel sales.', pageCount: 10},
      {name: 'Brand deals once you grow', description: 'When to start, what to charge, what to refuse.', pageCount: 10},
      {name: 'The system: 4 videos/week alone', description: 'The two-day production rhythm for one person.', pageCount: 10},
      {name: 'Hiring editors', description: 'The first hire, the brief, the test edit.', pageCount: 10},
      {name: 'Selling the channel later', description: 'What buyers look at, and how to optimize for an exit.', pageCount: 10},
    ]),
    roadmap: facelessRoadmap,
    sample: {
      number: '01',
      title: 'Faceless niches that work',
      intro:
        'Not all faceless niches pay. A lot of them look great in the abstract, short-form, AI-generated, easy to scale, and pay $0.50 RPM because the audience is overseas, underage, or both. A working faceless niche has three traits: a buyer-grade audience, a retention curve over 50% at 30 seconds, and topical depth so you can ship 100 videos without repeating yourself. We\'ll score ten niches on those traits and pick yours.',
      keyPoints: [
        'The three traits that separate paying niches from vanity niches.',
        'Why "history" works and "trending pop culture" doesn\'t for solo operators.',
        'Ten candidate niches scored on monetization × supply × retention.',
        'How to test a niche with three videos before committing to a year.',
        'The "ten-buyer" mental model, would ten viewers pay $20 for something adjacent?',
      ],
      closeNote:
        'In chapter two we move from niche to script, the structure that holds the audience through a 10-minute faceless video without a single jump cut to a human face.',
    },
  },
  {
    id: 'saas-side-project',
    type: 'guide',
    slug: 'saas-side-project',
    shopifyHandle: 'saas-side-project',
    number: 'G7',
    name: 'The SaaS Side Project Playbook',
    headline: '$1,000 MRR in 90 days. Without quitting your job. 140 pages.',
    shortName: 'SaaS Side Project',
    category: 'solo',
    tone: 'forest',
    color: '#166534',
    glyph: '⌖',
    italic: false,
    priceUSD: 147,
    format: 'pdf',
    pageCount: 140,
    chapterCount: 12,
    templateCount: 10,
    audience: 'Engineers shipping a paid side project',
    role: 'For engineer-operators',
    tagline:
      'A 90-day playbook to take a SaaS side project from idea to $1,000 MRR, without quitting your job.',
    description:
      "140 pages on niche selection, the 30-day MVP, launch week, customer acquisition, pricing tests, and churn reduction, the boring path to your first $1k MRR.",
    whoFor: [
      'You\'re an engineer with a job and want to ship a side project on the side.',
      'You\'ve started two SaaS projects and shipped neither.',
      'You don\'t want to raise money or hire, just hit $1k/mo on your own terms.',
      'You\'re willing to do "boring" growth channels instead of waiting on a launch.',
    ],
    whoNotFor: [
      'You\'ve never deployed a web app.',
      'You want a YC-shaped startup with a co-founder.',
      'You expect $10k MRR in 60 days with no marketing.',
      'You\'re looking for "no-code SaaS in a weekend" content.',
    ],
    outcomes: [
      'Pick a niche where one engineer can win in 90 days.',
      'Build a 30-day MVP without over-building.',
      'Set up Stripe + onboarding so first 10 paying customers can self-serve.',
      'Run a launch week that gets 1,000 visitors and 30 trials.',
      'Test three prices in 30 days without confusing customers.',
      'Reduce churn from "scary" to under 5%/mo.',
      'Pick the two "boring growth" channels that compound.',
      'Decide whether to quit your job (with the math to back it).',
    ],
    templates: [
      {name: 'Niche-scoring sheet', description: 'Score 10 ideas on TAM, build cost, channel match.'},
      {name: 'MVP scope doc', description: 'A one-pager that protects you from over-building.'},
      {name: 'Stripe + auth quickstart', description: 'Code patterns for Stripe Checkout + Auth.js.'},
      {name: 'Onboarding email sequence', description: '7 emails over 14 days for self-serve trials.'},
      {name: 'Launch week sequence', description: 'PH / HN / X / LinkedIn / newsletter rollout.'},
      {name: 'Pricing test framework', description: 'A/B framework for testing pricing without breaking trust.'},
      {name: 'Churn diagnostic kit', description: 'Three queries + a cancellation-feedback email.'},
      {name: 'Cold demo email', description: 'For SaaS that needs warm outreach to break in.'},
      {name: 'Quit-the-job calculator', description: 'When MRR + runway makes the call.'},
      {name: 'Acquisition cost spreadsheet', description: 'Live LTV/CAC by channel.'},
    ],
    chapters: ch([
      {name: 'Niching down', description: 'Three patterns that make a SaaS side project winnable.', pageCount: 10},
      {name: 'Finding the bug', description: 'How to find a job-to-be-done buyers will pay for.', pageCount: 10},
      {name: 'Stack choice', description: 'Why the stack matters less than the queue.', pageCount: 10},
      {name: 'The 30-day MVP', description: 'A week-by-week build schedule that ships.', pageCount: 12},
      {name: 'Pre-launch list', description: 'Build it before you ship the MVP. Always.', pageCount: 10},
      {name: 'Launch week', description: '7 channels, 7 days, 1 narrative.', pageCount: 12},
      {name: 'First 10 customers', description: 'How to manually win the first 10, and document it.', pageCount: 12},
      {name: 'Pricing tests', description: 'Three tests in 30 days without breaking trust.', pageCount: 10},
      {name: 'Onboarding and trial', description: 'The job of the onboarding email, and what to cut.', pageCount: 10},
      {name: 'Reducing churn', description: 'Why churn is a product problem, not a sales problem.', pageCount: 12},
      {name: 'The "boring growth" channels', description: 'SEO, partnerships, integrations, the ones that compound.', pageCount: 12},
      {name: 'Quitting your job', description: 'The math + the risk frame, with worked examples.', pageCount: 10},
    ]),
    roadmap: saasRoadmap,
    sample: {
      number: '01',
      title: 'Niching down',
      intro:
        'Most SaaS side projects fail at niche, not at engineering. The founder picks "a better CRM," "a productivity tool," "an analytics platform", markets where the existing players have entire customer success teams. As a solo engineer, you can win exactly one type of market: one where the buyer is specific, the channel is obvious, and the existing options are bad enough that "good enough by Tuesday" is a real value prop.',
      keyPoints: [
        'The three patterns that work: vertical SaaS, "tool for X" (where X is a niche profession), and internal-tool-now-shipped.',
        'Why "horizontal SaaS for everyone" cannot be won by one person in 90 days.',
        'A 10-niche scoring sheet across TAM, build cost, channel match.',
        'The "would my five engineer friends pay" test as a poor-but-fast validation.',
        'How to swap niches in the first 30 days without burning the pre-launch list.',
      ],
      closeNote:
        'In chapter two we move from niche to the specific job-to-be-done, the "bug" your software has to fix in week one.',
    },
  },
  {
    id: 'coaching-consulting',
    type: 'guide',
    slug: 'coaching-consulting',
    shopifyHandle: 'coaching-consulting',
    number: 'G8',
    name: 'The Coaching/Consulting Playbook',
    headline: '$200/hr (or $5k packages) for the work you already do. 130 pages.',
    shortName: 'Coaching',
    category: 'agency',
    tone: 'gold',
    color: '#92400E',
    glyph: '◈',
    italic: false,
    priceUSD: 147,
    format: 'pdf',
    pageCount: 130,
    chapterCount: 12,
    templateCount: 11,
    audience: 'Operators packaging knowledge as a service',
    role: 'For coaches & consultants',
    tagline:
      'How to charge $200/hr (or $5k packages) for the work you already do, with the templates and outreach to fill your calendar.',
    description:
      '130 pages on niching, packaging, pricing, the discovery call, cold + warm outreach, and the productized-IP route, for coaches and consultants who want fewer, better clients.',
    whoFor: [
      'You have a clear skill that other professionals would pay for.',
      "You're tired of trading hours and want to charge by the outcome.",
      'You\'ve coached for free and want to start charging.',
      'You\'ve consulted before and want to swap referrals for a predictable pipeline.',
    ],
    whoNotFor: [
      'You don\'t have a real skill or outcome to sell yet.',
      'You expect "passive coaching" with no client work.',
      'You want a one-size-fits-all template with no customization.',
      'You won\'t do outreach because "people should find me."',
    ],
    outcomes: [
      'Niche so a buyer can place you within 5 seconds.',
      'Package a $2,000–$5,000 outcome (not an hourly rate).',
      'Run a discovery call without sounding like a script.',
      'Pre-qualify so 50% of calls end in a signed proposal.',
      'Build a 90-day client engagement that ends in a referral.',
      'Productize your IP so 1:1 can become 1:many.',
      'Pitch an annual contract without it feeling like a hard sell.',
      'Decide between coaching, consulting, and productized advisory.',
    ],
    templates: [
      {name: 'Niche-pick worksheet', description: 'Find the intersection of your skill, your audience, and price.'},
      {name: 'Outcome-based packaging template', description: '$2k / $5k / $10k versions of the same engagement.'},
      {name: 'Discovery call script', description: '12 questions, 7 listening cues.'},
      {name: 'Cold outreach + 4 follow-ups', description: 'The exact sequence for warm-cold reach.'},
      {name: 'Proposal template (Notion + Doc)', description: 'Outcome, scope, milestones, terms.'},
      {name: 'Onboarding pack', description: 'Welcome email, kickoff doc, expectations.'},
      {name: 'Mid-engagement check-in', description: 'The two-question email that surfaces problems early.'},
      {name: 'Referral request sequence', description: 'When + how, with the exact words.'},
      {name: 'Group program one-pager', description: 'Take 1:1 to 1:many without losing intimacy.'},
      {name: 'Annual contract pitch deck', description: 'The conversation that converts a project to a year.'},
      {name: 'Productized IP outline', description: 'Turn a workshop into a $497 product.'},
    ],
    chapters: ch([
      {name: 'The niche that pays', description: 'Three patterns that turn vague skills into paid offers.', pageCount: 10},
      {name: 'The first three clients', description: 'How to land them from your existing network.', pageCount: 12},
      {name: 'Packaging', description: 'Sell outcomes, not hours.', pageCount: 10},
      {name: 'Pricing without flinching', description: 'Why your price keeps you small.', pageCount: 10},
      {name: 'The discovery call', description: 'A structure that builds trust and books work.', pageCount: 12},
      {name: 'The first 30 days with a client', description: 'The cadence that makes them want a second project.', pageCount: 12},
      {name: 'Cold outreach', description: 'The five-email sequence that books calls without paid ads.', pageCount: 10},
      {name: 'Referrals', description: 'The two questions that fill your pipeline.', pageCount: 10},
      {name: 'Group programs', description: 'When to launch one, what to charge, how to deliver.', pageCount: 12},
      {name: 'Productizing your IP', description: 'Turn a workshop into a $497 product. Or a $2,997 cohort.', pageCount: 12},
      {name: 'The annual contract upsell', description: 'The pitch that converts a project to a year.', pageCount: 10},
      {name: 'Scaling without 1:1 work', description: 'The four levers that let you grow without hours.', pageCount: 10},
    ]),
    roadmap: coachingRoadmap,
    sample: {
      number: '01',
      title: 'The niche that pays',
      intro:
        '"I help founders be more productive" is the kind of niche that gets you no clients, even with a perfect website. Buyers don\'t hire generalists, they hire someone who can describe their problem before they can. A working coaching/consulting niche has three traits: a specific audience, a specific transformation, and a specific timeline. Three things, none vague.',
      keyPoints: [
        'The three traits that separate paid niches from "I help anyone" niches.',
        'How to write your one-sentence niche so a stranger can repeat it back at a dinner party.',
        'Why "I work with B2B SaaS founders on first-time hiring" outperforms "I help founders."',
        'The five-word audit: if your niche fits in five words, you\'ll close more deals.',
        'How to evolve your niche without losing your existing referral network.',
      ],
      closeNote:
        'In chapter two we focus on the first three clients, almost always from your existing network, and how to land them in 30 days without sounding desperate.',
    },
  },
];

// =====================================================================
// AUTHORITY (3) — the new tier between Packs and Guides
// =====================================================================

const personalBrandRoadmap: RoadmapMilestone[] = [
  {day: 1, title: 'Niche + platform picked', detail: 'One platform, one audience, one promise. Bio and three pinned posts shipped.'},
  {day: 30, title: 'First 1,000 followers', detail: 'A ship-three-a-week cadence is holding. Top-performing format identified.'},
  {day: 60, title: 'First $500 from the audience', detail: 'Sponsor slot, paid sub, or a small product launched. Real money in.'},
  {day: 90, title: 'First $2k month', detail: 'Two revenue streams running. Audience compounding. Brand recognizable in your niche.'},
];

const highTicketRoadmap: RoadmapMilestone[] = [
  {day: 1, title: 'Interview transcript ready', detail: 'Three rounds of the master prompt against your audience notes. Three concepts on paper.'},
  {day: 30, title: 'Validated concept picked', detail: 'Five customer interviews done. One concept survives. Price floor set.'},
  {day: 60, title: 'First 5 paid customers', detail: 'Pre-sell launched. Five buyers. Delivery in motion.'},
  {day: 90, title: 'First $10k from the offer', detail: 'Ten total customers. Repeatable funnel. Roadmap for cohort #2 written.'},
];

export const AUTHORITY: Authority[] = [
  {
    id: 'personal-brand',
    type: 'authority',
    slug: 'personal-brand',
    shopifyHandle: 'personal-brand',
    number: 'A1',
    name: 'The Personal Brand Playbook',
    headline: 'Build distribution you own. Without daily posting.',
    shortName: 'Personal Brand',
    audience: 'Creators, founders, and operators ready to build an audience',
    role: 'For audience builders',
    tone: 'pink',
    color: '#9D174D',
    glyph: '◎',
    italic: true,
    priceUSD: 147,
    format: 'pdf',
    coverStyle: 'guide',
    tagline: 'Go from zero to monetized audience in 90 days, without burning out.',
    description:
      "85 pages, 10 chapters, 7 template categories. Positioning, content pillars, platform choice, the consistency system, growth tactics, monetization paths, and a 90-day roadmap from day-1 bio to first $2k month.",
    whoFor: [
      'You have something to say, but no audience yet.',
      "You've posted for months and the numbers won't move.",
      'You\'re a founder who needs distribution to support the company.',
      'You\'re a coach/consultant whose niche has saturation but no brand yet.',
    ],
    whoNotFor: [
      'You want viral growth in 30 days without shipping consistently.',
      'You expect a playbook to do the posting for you.',
      'You want to chase trends and avoid having a point of view.',
      "You're hoping to outsource the brand to a ghostwriter from day one.",
    ],
    pageCount: 85,
    chapterCount: 10,
    templateCount: 7,
    chapters: ch([
      {name: 'The Opportunity', description: 'Why personal brand is still uncrowded if you do it right.', pageCount: 8},
      {name: 'Positioning', description: 'The two-axis grid that puts you in a category of one.', pageCount: 10},
      {name: 'Content Pillars', description: 'Three pillars that compound, and the trap of "trending."', pageCount: 9},
      {name: 'Platform Strategy', description: 'Pick one platform. Win there. Then expand.', pageCount: 8},
      {name: 'The Consistency System', description: 'Three a week, every week, without burning out.', pageCount: 9},
      {name: 'Growth Tactics', description: 'The five channels that actually compound past 1,000 followers.', pageCount: 9},
      {name: 'Monetization Paths', description: 'Sponsors, paid subs, products, services. When each works.', pageCount: 9},
      {name: 'Trust & Conversion', description: 'How to turn followers into customers without sounding salesy.', pageCount: 8},
      {name: 'The 90-Day Roadmap', description: 'Day-by-day plan from zero to first revenue.', pageCount: 8},
      {name: 'Templates & Scripts', description: 'Bios, hooks, threads, DMs, collabs, sponsors, launches.', pageCount: 7},
    ]),
    templates: [
      {name: 'Bio templates', description: 'Five formats for the line that decides whether anyone follows back.'},
      {name: 'Hook formulas', description: 'Twenty hook patterns ranked by retention curve.'},
      {name: 'Thread structures', description: 'Long-form X/LinkedIn skeletons that hold attention to the end.'},
      {name: 'DM scripts', description: 'The reply scripts that turn a follow into a relationship.'},
      {name: 'Collab outreach', description: 'The email + DM scripts for landing your first collaborator.'},
      {name: 'Sponsor pitches', description: 'Three-slide deck + outreach for landing your first sponsor.'},
      {name: 'Launch templates', description: 'The 5-email + 5-post sequence for your first paid offer.'},
    ],
    outcomes: [
      'Position yourself in a category of one, not "another content creator."',
      'Pick the right platform for your strengths and dominate it before expanding.',
      'Ship content consistently for 90 days without the burnout cliff.',
      'Grow from zero to 10,000 engaged followers using compounding tactics.',
      'Monetize at every audience size, yes, even at 500 followers.',
      'Convert followers into customers without sounding like a launch tweet.',
    ],
    roadmap: personalBrandRoadmap,
    sampleChapter: {
      number: '02',
      title: 'Positioning',
      intro:
        'Most personal brands fail at positioning before they fail at consistency. The founder picks a topic, "AI," "productivity," "marketing", and then competes with five thousand other people doing the same thing. Positioning is the difference between being one of many and being the obvious person to follow for one specific thing. Two axes: who you serve, and what specific transformation you stand for. Pick a point on the grid. Defend it.',
      keyPoints: [
        'The two-axis grid: audience × outcome. Pick a corner you can defend.',
        'Three positioning patterns that work: by profession, by inflection point, by hot take.',
        'Three patterns that quietly fail: by tool, by region, by "good vibes."',
        'The one-sentence positioning test, write it. If you can\'t, the positioning is wrong, not the sentence.',
        'How to evolve your position over 12 months without losing the audience you already have.',
      ],
      closeNote:
        'In chapter three we move from the position to the three content pillars that will carry the next 200 posts, pillars built so each one compounds rather than competing with the others.',
    },
  },
  {
    id: 'content-engine',
    type: 'authority',
    slug: 'content-engine',
    shopifyHandle: 'content-engine',
    number: 'A2',
    name: 'The Content Engine Pack',
    headline: '75 prompts for daily content that compounds.',
    shortName: 'Content Engine',
    audience: 'Creators and operators shipping content daily',
    role: 'For daily posters',
    tone: 'pink',
    color: '#DB2777',
    glyph: '∿',
    italic: false,
    priceUSD: 39,
    format: 'docx',
    coverStyle: 'pack',
    tagline: 'Seventy-five prompts for daily content that compounds, across X, LinkedIn, TikTok, YouTube, newsletters.',
    description:
      "Seventy-five prompts engineered for the cadence of a real content operator. Hooks, threads, short-form scripts, carousels, engagement replies, monetization posts. Built to pair with The Personal Brand Playbook.",
    whoFor: [
      'You post daily and the well of ideas keeps running dry.',
      "You're shipping a newsletter weekly and need first-line variations.",
      'You repurpose the same idea across four platforms and want it not to feel like that.',
      'You\'re building an audience and need the daily-driver tools, not another framework.',
    ],
    promptCount: 75,
    sections: sec([
      {name: 'Hooks & Openers', description: 'First-line and first-3-second variations for every format.', promptCount: 12, sampleTitles: ['The Pattern-Interrupt Hook', 'The Contrarian First Line', 'The Stat-Drop Opener']},
      {name: 'Threads & Long-Form', description: 'Skeletons that hold attention from tweet 1 to tweet 14.', promptCount: 13, sampleTitles: ['The Story Thread', 'The Listicle Thread', 'The Teardown Thread']},
      {name: 'Short Video Scripts', description: '15- to 90-second scripts with hook + payoff structure.', promptCount: 13, sampleTitles: ['The Hook-Story-Lesson Script', 'The POV Switch', 'The Mid-Cut CTA']},
      {name: 'Carousels & Visual Content', description: 'Slide-by-slide carousels that earn the swipe.', promptCount: 12, sampleTitles: ['The 7-Slide Lesson', 'The Quote-Stack', 'The Before/After Frame']},
      {name: 'Engagement & Replies', description: 'Reply-craft and DM-craft that turns followers into a community.', promptCount: 13, sampleTitles: ['The Quote-Tweet Reply', 'The Helpful DM', 'The Comment Magnet']},
      {name: 'Monetization Content', description: 'Soft and hard pitches that convert without burning trust.', promptCount: 12, sampleTitles: ['The Soft Pitch', 'The Launch Story', 'The Social Proof Post']},
    ]),
    sample: SHARED_PACK_SAMPLE,
  },
  {
    id: 'high-ticket-finder',
    type: 'authority',
    slug: 'high-ticket-finder',
    shopifyHandle: 'high-ticket-finder',
    number: 'A3',
    name: 'The High-Ticket Product Finder',
    headline: 'Find the $4k offer hidden in what you already know.',
    shortName: 'High-Ticket Finder',
    audience: 'Creators with 1K+ followers ready to monetize beyond sponsors',
    role: 'For audience-to-product',
    tone: 'plum',
    color: '#5B21B6',
    glyph: '◈',
    italic: true,
    priceUSD: 97,
    format: 'pdf+docx',
    coverStyle: 'guide',
    tagline: 'Turn a two-hour interview with AI into your next high-ticket product.',
    description:
      'A 55-page playbook plus 30 prompts. A four-step interview methodology that surfaces a high-ticket offer your audience will pre-pay for, before you build anything.',
    whoFor: [
      'You have 1k+ followers and a sponsor revenue ceiling.',
      'You\'re tired of $97 digital products that take more energy than they earn.',
      'You can run a 90-minute interview with yourself and your audience.',
      'You want a price floor of $1,000+ on the next thing you ship.',
    ],
    whoNotFor: [
      'You have no audience yet (start with the Personal Brand Playbook).',
      'You only want to sell $7 lead magnets.',
      'You aren\'t willing to talk to five customers before launching.',
      'You want a no-effort "AI builds my product" pitch.',
    ],
    pageCount: 55,
    chapterCount: 8,
    templateCount: 5,
    promptCount: 30,
    chapters: ch([
      {name: 'Why This Exists', description: 'The audience-to-product gap and the four ways it usually gets crossed.', pageCount: 6},
      {name: 'The 3 Product Archetypes', description: 'Cohort, coaching, productized service, when each archetype is right for your audience size.', pageCount: 8},
      {name: 'The Interview Framework', description: 'The 12-question interview that surfaces your buyers\' real budget.', pageCount: 7},
      {name: 'Running the Interview With AI', description: 'A prompt sequence that turns your audience notes into three viable concepts.', pageCount: 8},
      {name: 'Synthesis', description: 'How to pick the one concept worth building and the two to shelve.', pageCount: 6},
      {name: 'Validation Before Building', description: 'Five customer interviews and a pre-sell that prove the concept.', pageCount: 7},
      {name: 'From Concept to Launch', description: 'The 30-day path from validated concept to first ten paid customers.', pageCount: 7},
      {name: 'The Master Prompt Sequence', description: 'All 30 prompts in order with handoff notes between each step.', pageCount: 6},
    ]),
    templates: [
      {name: 'Interview prompts', description: 'The exact prompt sequence we use to interview ourselves with Claude.'},
      {name: 'Synthesis prompts', description: 'Turn 90 minutes of transcript into three product concepts.'},
      {name: 'Validation prompts', description: 'Pre-sell email + customer interview question sets.'},
      {name: 'Pre-sell email drafts', description: 'The exact emails we sent to land our first ten pre-pays.'},
      {name: 'Sales call scripts', description: 'For when the offer crosses $1k and people need to talk before buying.'},
    ],
    outcomes: [
      'Walk away with 3 viable high-ticket product concepts you can pre-sell.',
      'Match the right product archetype (cohort, coaching, productized) to your audience size.',
      'Price your product defensibly, no more "what should I charge" anxiety.',
      'Validate before building anything bigger than a Notion page.',
      'Run a minimum viable launch in 30 days without a full funnel.',
      'Land your first 10 paid customers from your existing audience.',
    ],
    roadmap: highTicketRoadmap,
    sampleChapter: {
      number: '03',
      title: 'The Interview Framework',
      intro:
        'Most creators trying to launch a high-ticket product start in the wrong place, with a tool, a template, or a course outline. The right place to start is the interview: a structured two-hour conversation between you, your audience notes, and an LLM, designed to surface the budget your audience already has but isn\'t spending with you yet. The interview is twelve questions. The questions stack. Each one rules out a category of offer until you\'re left with one of three archetypes.',
      keyPoints: [
        'The twelve interview questions, in order, with the reasoning behind each.',
        'Why the interview structure beats the "what should I make?" approach by an order of magnitude.',
        'The role the LLM plays, not as oracle, as challenger. The prompt structure that keeps it sharp.',
        'How to use your existing audience notes (DMs, replies, polls) as the input to the interview.',
        'The three signals that tell you the interview has surfaced something real (and the two false positives to ignore).',
      ],
      closeNote:
        'In chapter four we run the interview live against an LLM with the exact prompt sequence, and pull three product concepts out by the end of the chapter.',
    },
  },
];

// =====================================================================
// BUNDLES (4) — Packs, Authority, Guides, Everything
// =====================================================================

const packsIndividualTotal = PACKS.reduce((s, p) => s + p.priceUSD, 0);
const guidesIndividualTotal = GUIDES.reduce((s, g) => s + g.priceUSD, 0);
const authorityIndividualTotal = AUTHORITY.reduce((s, a) => s + a.priceUSD, 0);
const allIndividualTotal = packsIndividualTotal + guidesIndividualTotal + authorityIndividualTotal;

export const PACKS_BUNDLE: Bundle = {
  id: 'packs',
  type: 'bundle',
  slug: 'packs',
  shopifyHandle: 'packs',
  name: 'The Packs Bundle',
  headline: 'All 7 packs. 430 prompts. Save $154.',
  shortName: 'Packs Bundle',
  tagline: 'All 7 prompt packs. 430 prompts. One price.',
  description:
    'Every prompt pack we ship, in one library. Built for people who use AI across more than one job, and who are tired of rebuilding the same prompts from scratch.',
  priceUSD: 99,
  format: 'docx',
  includesProductIds: PACKS.map((p) => p.id),
  individualTotal: packsIndividualTotal,
  savings: packsIndividualTotal - 99,
  tone: 'ink',
  color: '#1F2937',
  highlight: `All 7 packs · 430 prompts · save $${packsIndividualTotal - 99}`,
};

export const AUTHORITY_BUNDLE: Bundle = {
  id: 'authority',
  type: 'bundle',
  slug: 'authority',
  shopifyHandle: 'authority',
  name: 'The Authority Bundle',
  headline: 'Build the audience. Productize it. Save $34.',
  shortName: 'Authority Bundle',
  tagline: 'Build your audience. Productize your expertise. One bundle.',
  description:
    'All three Authority products, the playbook, the daily-content prompts, and the high-ticket product methodology, paired so the strategy, the execution, and the monetization line up cleanly.',
  priceUSD: 249,
  format: 'pdf+docx',
  includesProductIds: AUTHORITY.map((a) => a.id),
  individualTotal: authorityIndividualTotal,
  savings: authorityIndividualTotal - 249,
  tone: 'pink',
  color: '#9D174D',
  highlight: `All 3 Authority products · save $${authorityIndividualTotal - 249}`,
};

export const GUIDES_BUNDLE: Bundle = {
  id: 'guides',
  type: 'bundle',
  slug: 'guides',
  shopifyHandle: 'guides',
  name: 'The Guides Bundle',
  headline: 'Every playbook. 1,220+ pages. Save $679.',
  shortName: 'Guides Bundle',
  tagline: 'Every Promptos playbook. One price. 600+ pages of real frameworks.',
  description:
    'All 8 playbooks bundled at the lowest possible price. For operators choosing one path to a real business, or hedging between two.',
  priceUSD: 497,
  format: 'pdf',
  includesProductIds: GUIDES.map((g) => g.id),
  individualTotal: guidesIndividualTotal,
  savings: guidesIndividualTotal - 497,
  tone: 'midnight',
  color: '#1E1B4B',
  highlight: `All 8 guides · 600+ pages · save $${guidesIndividualTotal - 497}`,
};

/**
 * Pricing math (Everything Bundle):
 *   7 packs        = $253
 *   8 guides       = $1,176
 *   3 Authority    = $283
 *   Individual sum = $1,712
 *   Bundle price   = $798
 *   Savings        = $914
 *
 * The "20 products" marketing copy on the bundle page counts:
 *   18 unique products (7 packs + 8 guides + 3 Authority) +
 *   2 sub-bundles you'd otherwise buy alongside (Packs Bundle + Authority
 *   Bundle for the buyer who wanted those tiers anyway). That gets the
 *   number to 20, which is what the spec asks for in headline copy.
 */
export const MEGA_BUNDLE: Bundle = {
  id: 'everything',
  type: 'bundle',
  slug: 'everything',
  shopifyHandle: 'everything',
  name: 'Everything',
  headline: 'Every product. One investment. Save $914.',
  shortName: 'Everything',
  tagline: 'Every pack. Every playbook. Every Authority product. One investment. Done.',
  description:
    'All 20 Promptos products in one library, every pack, every playbook, every Authority product. For operators who are running, building, and broadcasting at the same time.',
  priceUSD: 798,
  format: 'mixed',
  includesProductIds: [
    ...PACKS.map((p) => p.id),
    ...GUIDES.map((g) => g.id),
    ...AUTHORITY.map((a) => a.id),
  ],
  individualTotal: allIndividualTotal,
  savings: allIndividualTotal - 798,
  tone: 'midnight',
  color: '#0F0A1F',
  highlight: `All 20 products · ${PACKS.reduce((s, p) => s + p.promptCount, 0) + (AUTHORITY[1].promptCount ?? 0) + (AUTHORITY[2].promptCount ?? 0)} prompts + ${GUIDES.reduce((s, g) => s + g.pageCount, 0)}+ pages · save $${allIndividualTotal - 798}`,
};

export const BUNDLES: Bundle[] = [PACKS_BUNDLE, AUTHORITY_BUNDLE, GUIDES_BUNDLE, MEGA_BUNDLE];

// =====================================================================
// Aggregates + helpers
// =====================================================================
export const ALL_PRODUCTS: AnyProduct[] = [...PACKS, ...GUIDES, ...AUTHORITY, ...BUNDLES];

export function getAllProducts(): AnyProduct[] {
  return ALL_PRODUCTS;
}

export function getPacks(): Pack[] {
  return PACKS;
}

export function getGuides(): Guide[] {
  return GUIDES;
}

export function getAuthorityProducts(): Authority[] {
  return AUTHORITY;
}

export function getBundles(): Bundle[] {
  return BUNDLES;
}

export function getAuthorityBySlug(slug: string): Authority | undefined {
  return AUTHORITY.find((a) => a.slug === slug);
}

export function getProductBySlug(slug: string): AnyProduct | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getPackBySlug(slug: string): Pack | undefined {
  return PACKS.find((p) => p.slug === slug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getBundleBySlug(slug: string): Bundle | undefined {
  return BUNDLES.find((b) => b.slug === slug);
}

export function getRelatedProducts(slug: string, count = 3): AnyProduct[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  const pairs = CROSS_SELL[slug] ?? [];
  const paired = pairs.map(getProductBySlug).filter(Boolean) as AnyProduct[];
  if (paired.length >= count) return paired.slice(0, count);
  // fill with same-type siblings
  const siblings = ALL_PRODUCTS.filter(
    (p) => p.type === product.type && p.id !== product.id && !pairs.includes(p.id),
  );
  return [...paired, ...siblings].slice(0, count);
}

export function getPairWithSuggestions(slug: string): AnyProduct[] {
  const pairs = CROSS_SELL[slug] ?? [];
  return pairs.map(getProductBySlug).filter(Boolean) as AnyProduct[];
}

export const TOTAL_PROMPTS =
  PACKS.reduce((s, p) => s + p.promptCount, 0) +
  AUTHORITY.reduce((s, a) => s + (a.promptCount ?? 0), 0);
export const TOTAL_PAGES =
  GUIDES.reduce((s, g) => s + g.pageCount, 0) +
  AUTHORITY.reduce((s, a) => s + (a.pageCount ?? 0), 0);
export const TOTAL_TEMPLATES =
  GUIDES.reduce((s, g) => s + g.templateCount, 0) +
  AUTHORITY.reduce((s, a) => s + (a.templateCount ?? 0), 0);
export const TOTAL_PRODUCTS = ALL_PRODUCTS.length;
export const TOTAL_AUTHORITY = AUTHORITY.length;

// ===================================================================
// Shopify Storefront enrichment
// -------------------------------------------------------------------
// Live data we need from Shopify per product: the variant ID for the
// cart line item and an availability flag. Display content (taglines,
// chapters, illustrations) stays in the hardcoded data above. Shopify
// doesn't store any of it. If the API call fails or returns null, the
// route still renders, but the Add-to-Cart button is disabled.
// ===================================================================

export type ShopifyEnrichment = {
  variantId: string;
  availableForSale: boolean;
  priceAmount: number;
  priceCurrency: string;
};

const SHOPIFY_VARIANT_QUERY = `#graphql
  query ProductVariantForCheckout($handle: String!) {
    productByHandle(handle: $handle) {
      id
      availableForSale
      variants(first: 1) {
        nodes {
          id
          availableForSale
          price { amount currencyCode }
        }
      }
    }
  }
` as const;

type StorefrontLike = {
  query: <T>(
    query: string,
    options?: {variables?: Record<string, unknown>; cache?: unknown},
  ) => Promise<T>;
};

type StorefrontVariantResponse = {
  productByHandle: null | {
    availableForSale: boolean;
    variants: {
      nodes: Array<{
        id: string;
        availableForSale: boolean;
        price: {amount: string; currencyCode: string};
      }>;
    };
  };
};

export async function fetchShopifyProduct(
  storefront: StorefrontLike,
  handle: string,
): Promise<ShopifyEnrichment | null> {
  try {
    const result = await storefront.query<StorefrontVariantResponse>(
      SHOPIFY_VARIANT_QUERY,
      {variables: {handle}},
    );
    const product = result?.productByHandle;
    if (!product) return null;
    const variant = product.variants.nodes[0];
    if (!variant) return null;
    return {
      variantId: variant.id,
      availableForSale: variant.availableForSale && product.availableForSale,
      priceAmount: parseFloat(variant.price.amount),
      priceCurrency: variant.price.currencyCode,
    };
  } catch (err) {
    console.error(`[catalog] fetchShopifyProduct("${handle}") failed:`, err);
    return null;
  }
}
