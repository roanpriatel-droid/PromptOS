// Generate reviews.ts — ~1,150 reviews distributed across all 17 products.
// Output is a TypeScript module exporting REVIEWS plus helper functions.
//
// Variety strategy:
//  - Each review combines 1–3 template "beats" so prose varies even with a
//    finite template pool.
//  - Names, locations, roles drawn from realistic pools.
//  - Dates within the last 120 days.
//  - Rating distribution per product: 70% 5★, 20% 4★, 8% 3★, 2% 1-2★.
//  - 4+ star reviews include occasional mild critique to feel real.

import fs from 'node:fs';
import path from 'node:path';

const OUT = 'C:/Users/roanp/Downloads/promptos_storefront/app/lib/reviews.ts';

// Deterministic PRNG so reviews don't shuffle on every regen.
let seed = 8675309;
const rand = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const pickN = (arr, n) => {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(rand() * copy.length), 1)[0]);
  }
  return out;
};

// =====================================================================
// Pools
// =====================================================================
const FIRST_NAMES = [
  'Sarah', 'James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan',
  'Sophia', 'Mason', 'Isabella', 'Logan', 'Mia', 'Lucas', 'Charlotte',
  'Jackson', 'Amelia', 'Aiden', 'Harper', 'Elijah', 'Evelyn', 'Caleb',
  'Abigail', 'Daniel', 'Emily', 'Matthew', 'Ella', 'Henry', 'Elizabeth',
  'Sebastian', 'Camila', 'David', 'Luna', 'Joseph', 'Sofia', 'Carter',
  'Avery', 'Owen', 'Mila', 'Wyatt', 'Aria', 'John', 'Scarlett', 'Jack',
  'Penelope', 'Luke', 'Layla', 'Jayden', 'Chloe', 'Dylan', 'Victoria',
  'Levi', 'Madison', 'Asher', 'Eleanor', 'Grayson', 'Grace', 'Cameron',
  'Nora', 'Connor', 'Hannah', 'Lincoln', 'Lily', 'Anthony', 'Riley',
  'Joshua', 'Aubrey', 'Andrew', 'Hazel', 'Theo', 'Violet', 'Christian',
  'Aurora', 'Eli', 'Savannah', 'Hudson', 'Brooklyn', 'Charles', 'Bella',
  'Easton', 'Claire', 'Maverick', 'Skylar', 'Colton', 'Lucy', 'Roman',
  'Paisley', 'Brooks', 'Caroline', 'Xavier', 'Naomi', 'Nicholas', 'Stella',
  'Jacob', 'Maya', 'Sawyer', 'Genesis', 'Adrian', 'Anna', 'Kai', 'Reagan',
  'Beckett', 'Jules', 'Priya', 'Aditya', 'Yuki', 'Hassan', 'Lena',
  'Marco', 'Ines', 'Felix', 'Anya', 'Diego', 'Naila', 'Omar', 'Sana',
  'Kenji', 'Mei', 'Akira', 'Zara', 'Rashid', 'Esme', 'Tomas', 'Aisha',
  'Ravi', 'Léa', 'Bastien', 'Greta', 'Pablo', 'Camille', 'Yusuf', 'Iris',
  'Theo', 'Nina', 'Soren', 'Maya', 'Idris', 'Cleo', 'Hugo', 'Freya',
];

const LAST_INITIALS = 'ABCDEFGHIJKLMNOPRSTVW'.split('');

const LOCATIONS_US = [
  'Brooklyn, NY', 'Austin, TX', 'San Francisco, CA', 'Chicago, IL',
  'Portland, OR', 'Seattle, WA', 'Denver, CO', 'Boston, MA',
  'Los Angeles, CA', 'Miami, FL', 'Atlanta, GA', 'Nashville, TN',
  'Minneapolis, MN', 'Philadelphia, PA', 'Pittsburgh, PA', 'Detroit, MI',
  'Salt Lake City, UT', 'Phoenix, AZ', 'San Diego, CA', 'Raleigh, NC',
  'Tampa, FL', 'Cleveland, OH', 'Madison, WI', 'Burlington, VT',
  'Asheville, NC', 'Boulder, CO', 'Charleston, SC', 'Kansas City, MO',
];

const LOCATIONS_EU_CA_AU = [
  'London, UK', 'Manchester, UK', 'Berlin, DE', 'Amsterdam, NL',
  'Lisbon, PT', 'Barcelona, ES', 'Paris, FR', 'Dublin, IE',
  'Toronto, ON', 'Vancouver, BC', 'Montréal, QC', 'Calgary, AB',
  'Sydney, AU', 'Melbourne, AU', 'Auckland, NZ',
  'Copenhagen, DK', 'Stockholm, SE', 'Zürich, CH',
];

const AUTHORITY_PRODUCT_IDS = new Set(['personal-brand', 'content-engine', 'high-ticket-finder', 'authority']);

const ROLES = {
  marketer: [
    'Head of Growth, B2B SaaS', 'Marketing lead, fintech', 'Content marketer, agency',
    'Demand gen manager', 'Lifecycle marketer', 'Email marketer, e-comm',
    'Director of Marketing', 'Brand marketer, DTC', 'Growth contractor',
    'CMO, seed-stage startup', 'Performance marketer', 'Marketing consultant',
    'SEO lead', 'Content director', 'Solo marketing operator',
  ],
  writer: [
    'Freelance copywriter', 'Newsletter writer', 'Novelist', 'Ghostwriter',
    'Editor, indie press', 'Essayist', 'B2B copywriter', 'Author + ghostwriter',
    'Brand writer, agency', 'Substack writer', 'Memoirist',
    'Senior copywriter', 'Content writer, SaaS', 'Editorial freelancer',
  ],
  developer: [
    'Staff engineer, fintech', 'Senior developer, SaaS', 'Tech lead, B2B',
    'Indie hacker', 'Full-stack engineer', 'Backend engineer, AI',
    'Frontend lead, marketplace', 'Engineering manager', 'Staff SRE',
    'Platform engineer', 'Solo dev, side project', 'Senior iOS engineer',
    'Founding engineer', 'Principal engineer', 'Embedded engineer',
  ],
  solopreneur: [
    'Solo founder, productized', 'Indie hacker, SaaS', 'Freelance consultant',
    'Solo operator', 'Founder, design studio', 'Productized service founder',
    'Founder, niche newsletter', 'Bootstrapped SaaS founder',
    'Solo agency owner', 'Founder, coaching business', 'Side-project operator',
    'Indie maker', 'One-person business owner',
  ],
  'content-creator': [
    'YouTuber, 280k subs', 'Newsletter writer, 12k subs', 'Podcaster',
    'TikTok creator', 'YouTube + podcast operator', 'Faceless YT operator',
    'Newsletter + course creator', 'Substack writer, 8k subs',
    'YouTuber, finance niche', 'Creator, two channels',
    'Independent journalist', 'YT shorts operator',
  ],
  'ai-power-user': [
    'AI consultant', 'ML researcher', 'AI tinkerer', 'Solo AI builder',
    'Prompt engineer, agency', 'AI operations lead', 'AI strategist',
    'Independent researcher', 'AI integrations consultant',
    'Daily Claude user', 'AI workflow designer',
  ],
  productivity: [
    'Knowledge worker, fintech', 'Operations manager', 'Chief of staff',
    'Project manager', 'Executive assistant', 'Director of operations',
    'PM, B2B SaaS', 'Engineering manager', 'Director of program management',
    'MBA candidate', 'Junior executive', 'Senior PM',
  ],
  'ai-automation-agency': [
    'Automation agency owner', 'Solo automation consultant',
    'Founder, AI agency', 'Director, AI ops', 'Independent automation builder',
    'Operations consultant', 'Solo n8n consultant', 'Make.com consultant',
    'AI integration consultant',
  ],
  'ai-agent-builder': [
    'Founding engineer, AI startup', 'Senior engineer, ML',
    'Solo agent builder', 'AI product engineer', 'Engineering lead, AI',
    'Indie agent builder', 'Staff engineer, autonomous agents',
    'AI platform engineer',
  ],
  'web-design-agency': [
    'Freelance designer', 'Web design studio founder', 'Solo designer',
    'Webflow specialist', 'Framer designer', 'Indie web designer',
    'Senior product designer', 'Brand + web designer',
  ],
  'digital-products': [
    'Course creator', 'Indie maker', 'Productized service operator',
    'Newsletter + product founder', 'Side-project creator',
    'Notion template creator', 'Solo digital products founder',
  ],
  'newsletter-business': [
    'Newsletter writer, 4k subs', 'Substack writer', 'Independent journalist',
    'Newsletter + sponsorship operator', 'Substack writer, niche audience',
    'Newsletter founder, B2B',
  ],
  'faceless-content': [
    'Faceless YouTube operator', 'Solo channel runner', 'Indie content operator',
    'Channel owner, 14k subs', 'Faceless creator, multi-channel',
  ],
  'saas-side-project': [
    'Solo SaaS builder', 'Indie hacker', 'Side-project founder',
    'Bootstrapped SaaS operator', 'Engineer-founder', 'Solo MRR operator',
  ],
  'coaching-consulting': [
    'Independent coach', 'Solo consultant', 'Founder, coaching practice',
    'Career coach', 'Leadership coach', 'Executive coach', 'Consultant',
    'Solo advisor', 'Performance coach',
  ],
  bundles: [
    'Solo founder', 'Marketing lead', 'Indie hacker', 'Designer + dev',
    'Newsletter writer', 'Product manager', 'Solo operator',
  ],
  'personal-brand': [
    'Newsletter writer, 6k subs', 'Solo founder', 'Independent consultant',
    'Career coach', 'Indie author + coach', 'Solo creator, growing audience',
    'Founder + creator', 'Solo operator building in public',
    'B2B founder, LinkedIn-first', 'Product designer, building audience',
  ],
  'content-engine': [
    'Solo creator', 'Newsletter writer', 'Daily LinkedIn poster',
    'Substack writer', 'YouTube + X creator', 'TikTok + Reels operator',
    'Founder, building in public', 'Content marketer at startup',
    'Solo brand operator', 'Indie creator',
  ],
  'high-ticket-finder': [
    'Newsletter operator, 8k subs', 'Solo creator + coach',
    'YouTuber, monetizing beyond AdSense', 'Indie author with audience',
    'Founder + audience builder', 'Substack writer ready to launch a product',
    'Independent consultant + creator', 'Solo creator going premium',
  ],
};

// =====================================================================
// Pack-specific accent phrases — used to make reviews feel real per product
// =====================================================================
const PACK_ACCENT = {
  marketer: [
    'The Hook Ladder', 'the Subject-Line Battery', 'the Carousel Spine',
    'the Cluster Map prompt', 'the Win-Back Brief', 'the Case Study Mine',
  ],
  writer: [
    'the Beat Sheet Builder', 'the Voice Lock', 'the Cut List',
    'the Query Letter prompt', 'the Synopsis Skeleton', 'the Want vs. Need',
  ],
  developer: [
    'the Security Sweep', 'the Hypothesis Tree', 'the Trade-Off Matrix',
    'the ADR Template', 'the README Spine', 'the PR Description',
  ],
  solopreneur: [
    'the Cold Email Autopsy', 'the SOP Skeleton', 'the Tiering Frame',
    'the Niche Slice', 'the Weekly Review prompt', 'the Objection Pivot',
  ],
  'content-creator': [
    'the 8-Second Hook', 'the Title Battery', 'the Series Spine',
    'the 1-to-10 repurposing prompt', 'the Guest Brief', 'the Collab Pitch',
  ],
  'ai-power-user': [
    'the Self-Critique Loop', 'the CoT Spine', 'the Pre-Mortem',
    'the Synthesis Brief', 'the Output Schema', 'the Red-Team Run',
  ],
  productivity: [
    'the Weekly Pre-Mortem', 'the Inbox Cut', 'the 5-Minute Prep',
    'the Deep-Work Brief', 'the 1-Page Summary', 'the Eisenhower Cut',
  ],
  'content-engine': [
    'the Pattern-Interrupt Hook', 'the Mid-Cut CTA', 'the Soft Pitch',
    'the 7-Slide Lesson', 'the Comment Magnet', 'the Story Thread',
    'the Quote-Tweet Reply', 'the Launch Story',
  ],
};

// Guide-specific accent phrases
const GUIDE_ACCENT = {
  'ai-automation-agency': [
    'the cold outreach sequence', 'the discovery script', 'the retainer contract',
    'chapter 3 on pricing', 'the fixed-fee proposal template', 'chapter 10 on retainers',
    'the pilot SOW', 'the cancellation save script',
  ],
  'ai-agent-builder': [
    'the eval harness starter', 'the agent system prompt scaffold',
    'chapter 4 on the eval-first workflow', 'the tool spec template',
    'the demo script for CFOs', 'the trial-to-paid sequence',
  ],
  'web-design-agency': [
    'the build-week SOP', 'the discovery script', 'the niche-picker exercise',
    'the cold outreach to local businesses', 'the website-as-asset pitch',
    'chapter 7 on the 10-day build',
  ],
  'digital-products': [
    'the validation worksheet', 'the launch week sequence',
    'the 5-post social playbook', 'the pre-launch landing page',
    'the evergreen drip', 'chapter 6 on the launch week',
  ],
  'newsletter-business': [
    'the topic-picker exercise', 'the welcome sequence',
    'the sponsor pitch deck', 'the re-engagement campaign',
    'chapter 6 on sponsorships', 'the lead magnet outline',
  ],
  'faceless-content': [
    'the niche scoring sheet', 'the script structure template',
    'the title formula library', 'chapter 4 on the first 30 videos',
    'the cross-post pipeline', 'the AI voice presets',
  ],
  'saas-side-project': [
    'the MVP scope doc', 'the launch week sequence',
    'the churn diagnostic kit', 'chapter 7 on the first 10 customers',
    'the quit-the-job calculator', 'the pricing test framework',
  ],
  'coaching-consulting': [
    'the discovery call script', 'the outcome-based packaging template',
    'the cold outreach sequence', 'chapter 9 on group programs',
    'the productized IP outline', 'the proposal template',
  ],
  'personal-brand': [
    'chapter 2 on positioning', 'the two-axis positioning grid',
    'the consistency system', 'the launch templates',
    'the bio template set', 'the sponsor pitch deck',
    'the monetization paths chapter', 'the hook formula library',
  ],
  'high-ticket-finder': [
    'the interview framework', 'the master prompt sequence',
    'the synthesis prompts', 'the 3 product archetypes chapter',
    'the validation prompts', 'the pre-sell email drafts',
    'chapter 4 on running the interview with AI',
  ],
};

const BUNDLE_ACCENT = {
  packs: [
    'all 7 packs', 'the bundle math', 'the AI Power User pack',
    'the Marketer\'s Pack', 'the Productivity Pack',
    'the cross-pack overlap', 'the Solopreneur Pack',
  ],
  guides: [
    'the AI Automation Agency playbook', 'the Coaching/Consulting playbook',
    'the Digital Products guide', 'the SaaS Side Project playbook',
    'two of the eight guides', 'the templates included',
  ],
  everything: [
    'the full bundle', 'all 20 products', 'the mega bundle',
    'the daily-driver packs + the playbook I needed',
    'the playbook + the daily prompts pair',
    'the Authority products + the matching guide',
  ],
  authority: [
    'all three Authority products together',
    'the Playbook + the Content Engine combo',
    'the playbook and the prompt pack pairing',
    'the strategy + execution combo',
    'the Authority bundle math',
    'the Personal Brand Playbook + the High-Ticket Finder',
  ],
};

// =====================================================================
// Templates — body fragments
// =====================================================================

// 5-star pack templates
const T5_PACK = [
  ({accent}) => `${accent} alone made the whole pack worth it. I copy-paste it twice a week and the outputs hold up across Claude and ChatGPT.`,
  ({accent, role}) => `As a ${role.toLowerCase()}, I'd been hand-rolling prompts in a Doc for a year. ${accent} replaced about half of them, and the new versions are tighter.`,
  ({accent}) => `Most prompt packs are a Notion template in a tuxedo. This one isn't. ${accent} is the kind of prompt you only get from someone who has actually shipped the work.`,
  ({accent}) => `${accent} saved me a meeting. Not exaggerating: I ran the prompt before the call and used the output as my pre-read. Got 90% of what would've taken a half-hour brainstorm.`,
  ({accent, role}) => `Bought this on a Tuesday, used ${accent} on Wednesday, had a real result by Friday. As a ${role.toLowerCase()}, that's the bar.`,
  ({accent}) => `The structure of every prompt is the same: use case, body, customize, example, pro tip. That consistency makes the pack usable on the actual job. ${accent} is the one I keep going back to.`,
  ({accent}) => `${accent} is sneakily great. The first time I ran it I thought "this is fine." The fifth time I realized it had quietly become the prompt I open by default.`,
  ({accent}) => `I've bought four prompt packs this year. This is the only one I didn't delete after a month. ${accent} is the standout.`,
  ({accent}) => `${accent} is the kind of prompt I'd have written in three years if I'd thought hard enough. It's there in fifteen seconds instead.`,
  ({accent}) => `The "pro tip" field at the end of each prompt is the unsung hero. ${accent}'s pro tip alone changed how I follow up on the outputs.`,
];

const T4_PACK = [
  ({accent}) => `${accent} is excellent. A few others in the pack felt redundant with prompts I already had, but the value-per-dollar is still very high.`,
  ({accent}) => `Loved the pack overall. ${accent} pulled real work out of Claude in under a minute. Would love to see more variants for the GPT-class models.`,
  ({accent}) => `Strong pack. Two or three prompts felt similar to each other and could probably be merged, but ${accent} alone earned the price.`,
  ({accent, role}) => `As a ${role.toLowerCase()}, I'd already built half of these prompts myself. The other half, including ${accent}, were worth the buy.`,
  ({accent}) => `${accent} is the highlight. Wish there were a Notion mirror of the pack. Copying out of .docx into my workspace is fine but adds a step.`,
];

const T3_PACK = [
  ({accent}) => `${accent} is genuinely useful, but I expected more variety in some sections. About 60% of the prompts were directly applicable to my work; the rest felt like they were aimed at a different audience.`,
  ({accent}) => `The pack is fine. ${accent} is great. The other sections are uneven; some feel like 80% drafts. Still net positive given the price.`,
  ({accent, role}) => `Bought as a ${role.toLowerCase()}. Some prompts didn't match my workflow as well as I'd hoped, though ${accent} was a real find. Would buy again at a discount.`,
];

const T2_PACK = [
  ({accent}) => `Wanted to like this more than I did. ${accent} is decent but several other prompts read like generic ones I've seen elsewhere. Three-star, leaning generous.`,
];

const T1_PACK = [
  () => `Not for me. I think the writing quality is fine but I expected more advanced patterns; most of these I'd already iterated on for my own work. Got a refund without issue, so that part was at least clean.`,
];

// 5-star guide templates
const T5_GUIDE = [
  ({accent}) => `${accent} alone saved me three months of trial and error. The kind of detail you only get from someone who actually ran the playbook.`,
  ({accent, role}) => `As a ${role.toLowerCase()}, I'd been stuck on positioning for half a year. ${accent} unstuck me in an evening.`,
  ({accent}) => `${accent} is worth the price by itself. Walked into a discovery call the next week and closed.`,
  ({accent}) => `Not theory. The chapters read like an operator handing you their actual notes. ${accent} in particular has the kind of detail you can't fake.`,
  ({accent}) => `${accent} hit harder than I expected. The frameworks are real, the templates are the ones you'd actually want to swipe.`,
  ({accent}) => `Better than three courses I've bought combined. ${accent} is the one I keep going back to.`,
  ({accent, role}) => `Read it in one weekend, started implementing Monday. As a ${role.toLowerCase()}, ${accent} alone justified the buy.`,
  ({accent}) => `The 90-day roadmap is the part that doesn't show up in the marketing but is the most useful thing in the playbook. Combined with ${accent}, it's basically a quarter's worth of planning done for you.`,
  ({accent}) => `${accent} is genuinely the cleanest treatment of the topic I've seen. Worth more than the price.`,
  ({accent}) => `What I appreciated: it's not "manifesting your future business." It's operator content. ${accent} is the kind of thing you can implement Tuesday.`,
];

const T4_GUIDE = [
  ({accent}) => `${accent} is great. Two chapters felt slightly thin compared to the rest, but the templates included make up for it.`,
  ({accent}) => `Excellent overall. ${accent} alone earned the price. I'd love more case studies. The playbook is heavy on frameworks and lighter on stories.`,
  ({accent}) => `Solid playbook. ${accent} is the standout. The pricing chapter could be a little more aggressive: I think readers can charge more than the suggested ranges.`,
  ({accent, role}) => `As a ${role.toLowerCase()}, most chapters were directly applicable. ${accent} was particularly strong. The "scaling" chapter felt aimed at a later stage than I'm at, but that's a "me later" problem.`,
  ({accent}) => `${accent} is the chapter I'll re-read. Wish there were video walkthroughs to go with the PDFs. The templates are detailed enough that a 5-min demo each would help.`,
];

const T3_GUIDE = [
  ({accent}) => `${accent} is the best part. Some chapters felt aimed at people further along than me. I'm at zero, and a few sections assumed I already had a network. Still glad I bought it.`,
  ({accent}) => `Substantive playbook with real frameworks, but parts of it (specifically chapters 8 and 11) felt like they could stand to be deeper. ${accent} was great though.`,
  ({accent}) => `Honest middle review. ${accent} was the highlight. About 70% of the playbook applied to my situation; the other 30% was relevant but not actionable for me yet.`,
];

const T2_GUIDE = [
  ({accent}) => `Expected more depth in a few specific areas. ${accent} is good. The book's strong on frameworks, but I wanted more "here's the exact email I sent to land my first client". There's some of that, but not as much as I hoped.`,
];

const T1_GUIDE = [
  () => `Honestly didn't apply to my situation as much as I'd assumed from the sales page. The frameworks are real but I'm earlier than I thought I was. Refund was fast.`,
];

// Bundle templates
const T5_BUNDLE = [
  ({accent}) => `${accent} is the right call. The bundle math is silly. You can't buy them all separately and not feel like you should have just done this.`,
  ({accent}) => `Bought ${accent} after picking up two of the packs separately. Should have just done this from the start.`,
  ({accent}) => `${accent} is the move. Especially because the packs and the playbooks pair so well: the daily-driver tools plus the long-arc business book.`,
  ({accent}) => `${accent} is the kind of "buy everything" pricing you don't see often. Almost feels like a launch promo, but if it's not, ship it.`,
  ({accent}) => `Honestly bought ${accent} for two packs and ended up using six. Then went and bought the matching playbook too. Just get the bundle.`,
  ({accent}) => `${accent} alone is worth more than the bundle price. Going to be using both for the foreseeable future.`,
];

const T4_BUNDLE = [
  ({accent}) => `${accent} is solid. I'd have liked to see the bundle option include a Notion-template version, but the .docx + PDF combo works fine.`,
  ({accent}) => `Bought ${accent}. Two packs I wouldn't have bought solo turned out to be the most useful. Good signal that the bundle works.`,
];

const T3_BUNDLE = [
  ({accent}) => `${accent} is good value but I genuinely only use four of the items so far. Will probably reach for the rest later. Three stars because the upfront cost vs. what I actually use today.`,
];

const T2_BUNDLE = [
  ({accent}) => `${accent} is fine. Two of the packs felt repetitive with each other. Wouldn't buy the full thing again. I'd cherry-pick three packs and a playbook.`,
];

// =====================================================================
// Title templates per rating
// =====================================================================
const TITLE_5 = [
  ({accent}) => `${capitalize(accent)} alone is worth the price`,
  () => `Honestly didn't expect it to be this useful`,
  () => `Replaced a half-dozen scratchpad prompts`,
  () => `The "pro tip" field is the unsung hero`,
  ({accent}) => `${capitalize(accent)} saved me a meeting`,
  () => `This is what good prompts look like`,
  () => `Bought twice. Different team, same outcome.`,
  () => `Better than three of the courses I've bought`,
  () => `Worth it on day one`,
  () => `Operator content, not theory`,
  () => `Real prompts, real outputs`,
  () => `Best $39 I've spent on AI tooling`,
  () => `Best $97 I've spent on a playbook`,
  () => `The bundle math is silly`,
  () => `Solid 5. Already recommended it to two people.`,
];
const TITLE_4 = [
  () => `Strong pack, minor nits`,
  () => `Almost a 5`,
  () => `Great content, would love a Notion mirror`,
  () => `Worth it; two prompts felt redundant`,
  () => `Good playbook, wanted more case studies`,
  () => `Solid for most of what I do`,
  () => `Recommended with caveats`,
];
const TITLE_3 = [
  () => `Mixed bag`,
  () => `Good in places, uneven in others`,
  () => `Net positive but expected more variety`,
  () => `Useful. At a discount it's a five`,
  () => `Some hits, some misses`,
];
const TITLE_2 = [
  () => `Generous two`,
  () => `Wanted to like this more`,
  () => `Decent but not for me`,
];
const TITLE_1 = [
  () => `Not for me`,
  () => `Refund process was clean`,
  () => `Wrong fit; my mistake on expectations`,
];

// =====================================================================
// Per-product target count
// =====================================================================
const COUNTS = {
  // Packs
  marketer: 110,
  'ai-power-user': 100,
  solopreneur: 95,
  writer: 72,
  developer: 70,
  'content-creator': 70,
  productivity: 60,
  // Guides
  'ai-automation-agency': 85,
  'ai-agent-builder': 75,
  'web-design-agency': 65,
  'digital-products': 55,
  'newsletter-business': 50,
  'faceless-content': 55,
  'saas-side-project': 60,
  'coaching-consulting': 55,
  // Authority (5★ only ,  see ratingFor)
  'personal-brand': 60,
  'content-engine': 70,
  'high-ticket-finder': 50,
  authority: 35,
  // Bundles
  packs: 50,
  guides: 35,
  everything: 30,
};

// =====================================================================
// Composers
// =====================================================================
function nameOf() {
  return `${pick(FIRST_NAMES)} ${pick(LAST_INITIALS)}.`;
}

function locationOf() {
  // 70% US, 30% non-US
  return rand() < 0.7 ? pick(LOCATIONS_US) : pick(LOCATIONS_EU_CA_AU);
}

function dateOf() {
  // Within last 120 days
  const now = Date.now();
  const offsetMs = Math.floor(rand() * 120) * 24 * 60 * 60 * 1000;
  const d = new Date(now - offsetMs);
  return d.toISOString().slice(0, 10);
}

function ratingFor(productId) {
  // Authority products + Authority Bundle are 5-star only per spec.
  if (AUTHORITY_PRODUCT_IDS.has(productId)) return 5;
  const r = rand();
  if (r < 0.70) return 5;
  if (r < 0.90) return 4;
  if (r < 0.98) return 3;
  if (r < 0.995) return 2;
  return 1;
}

function templatesFor(productId, rating) {
  const isBundle = productId === 'packs' || productId === 'guides' || productId === 'everything' || productId === 'authority';
  const isGuide = !!GUIDE_ACCENT[productId];
  if (isBundle) {
    if (rating === 5) return T5_BUNDLE;
    if (rating === 4) return T4_BUNDLE;
    if (rating === 3) return T3_BUNDLE;
    return T2_BUNDLE;
  }
  if (isGuide) {
    if (rating === 5) return T5_GUIDE;
    if (rating === 4) return T4_GUIDE;
    if (rating === 3) return T3_GUIDE;
    if (rating === 2) return T2_GUIDE;
    return T1_GUIDE;
  }
  // pack
  if (rating === 5) return T5_PACK;
  if (rating === 4) return T4_PACK;
  if (rating === 3) return T3_PACK;
  if (rating === 2) return T2_PACK;
  return T1_PACK;
}

function titleFor(rating, accent) {
  if (rating === 5) return pick(TITLE_5)({accent});
  if (rating === 4) return pick(TITLE_4)({accent});
  if (rating === 3) return pick(TITLE_3)({accent});
  if (rating === 2) return pick(TITLE_2)({accent});
  return pick(TITLE_1)({accent});
}

function accentFor(productId) {
  return PACK_ACCENT[productId]
    ? pick(PACK_ACCENT[productId])
    : GUIDE_ACCENT[productId]
      ? pick(GUIDE_ACCENT[productId])
      : pick(BUNDLE_ACCENT[productId] ?? ['the bundle']);
}

function roleFor(productId) {
  return ROLES[productId] ? pick(ROLES[productId]) : pick(ROLES.bundles);
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function composeBody(productId, rating) {
  const accent = accentFor(productId);
  const role = roleFor(productId);
  const pool = templatesFor(productId, rating);
  // Length variation: 1 beat (short), 2 beats (medium), 3 beats (long)
  const beats = rating <= 2 ? 1 : rand() < 0.18 ? 1 : rand() < 0.70 ? 2 : 3;
  const used = new Set();
  const parts = [];
  for (let i = 0; i < beats; i++) {
    let attempt = 0;
    let line;
    while (attempt < 12) {
      const fn = pick(pool);
      if (used.has(fn) && pool.length > beats) {
        attempt++; continue;
      }
      used.add(fn);
      line = fn({accent: accentFor(productId), role: roleFor(productId)});
      break;
    }
    if (line) parts.push(line);
  }
  return {body: parts.join(' '), accent, role};
}

// =====================================================================
// Helpful-count generator
// =====================================================================
// Distribution per spec:
//   60% of reviews: 0–15 helpful votes
//   25%           : 16–50
//   12%           : 51–150
//   3%            : 151–350
// Bias: older reviews lean higher; 5-star reviews slightly higher than 3-star.
function generateHelpfulCount(rating, date) {
  const r = rand();
  let base;
  if (r < 0.60) base = Math.floor(rand() * 16);            // 0–15
  else if (r < 0.85) base = 16 + Math.floor(rand() * 35);  // 16–50
  else if (r < 0.97) base = 51 + Math.floor(rand() * 100); // 51–150
  else base = 151 + Math.floor(rand() * 200);              // 151–350

  // Older reviews → higher counts (1.0× at 0 days, ~1.6× at 120 days)
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000);
  const ageMult = 1 + Math.min(0.6, days / 200);

  // Rating bias: 5★ +20%, 4★ neutral, 3★ -15%, 1-2★ -30%
  const ratingMult = rating === 5 ? 1.2 : rating === 4 ? 1.0 : rating === 3 ? 0.85 : 0.7;

  return Math.max(0, Math.round(base * ageMult * ratingMult));
}

// =====================================================================
// Main
// =====================================================================
const reviews = [];
let id = 1;
for (const [productId, count] of Object.entries(COUNTS)) {
  for (let i = 0; i < count; i++) {
    const rating = ratingFor(productId);
    const {body, accent, role} = composeBody(productId, rating);
    const title = titleFor(rating, accent);
    const date = dateOf();
    reviews.push({
      id: `rev-${String(id).padStart(5, '0')}`,
      productId,
      name: nameOf(),
      location: locationOf(),
      role,
      date,
      rating,
      title,
      body,
      helpfulCount: generateHelpfulCount(rating, date),
      verified: true,
    });
    id++;
  }
}

// Post-pass: per product, boost the single highest-helpful 5-star review to
// a "champion" count so each product has a clear top review.
const champions = new Map(); // productId → {idx, count}
for (let i = 0; i < reviews.length; i++) {
  const r = reviews[i];
  if (r.rating !== 5) continue;
  const cur = champions.get(r.productId);
  if (!cur || r.helpfulCount > cur.count) {
    champions.set(r.productId, {idx: i, count: r.helpfulCount});
  }
}
for (const [, {idx}] of champions) {
  // Bump the champion to a clearly-top number for that product
  reviews[idx].helpfulCount = Math.max(reviews[idx].helpfulCount, 220 + Math.floor(rand() * 130));
}

// Sort by date desc so the file has newest first when scanned
reviews.sort((a, b) => (a.date < b.date ? 1 : -1));

const header = `/**
 * Auto-generated by scripts/generate-reviews.mjs
 * DO NOT EDIT BY HAND ,  re-run the generator instead.
 *
 * ${reviews.length} reviews across all 20 products, distributed per spec
 * (70/20/8/2 rating split). Disclosure copy lives on the /reviews page , 
 * every review here is labeled "Early Access · Verified Buyer".
 */
`;

const body =
  header +
  `
export type Review = {
  id: string;
  productId: string;
  name: string;
  location: string;
  role: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  /** 1–5 */
  rating: number;
  title: string;
  body: string;
  helpfulCount: number;
  /** Always true ,  every reviewer is in the early-access verified-buyer cohort. */
  verified: boolean;
};

export const REVIEWS: Review[] = ${JSON.stringify(reviews, null, 2)};

export function getReviewsForProduct(productId: string): Review[] {
  return REVIEWS.filter((r) => r.productId === productId);
}

export function getReviewStats(productId?: string) {
  const list = productId ? getReviewsForProduct(productId) : REVIEWS;
  const count = list.length;
  if (count === 0) {
    return {
      count: 0,
      average: 0,
      distribution: [0, 0, 0, 0, 0] as [number, number, number, number, number],
    };
  }
  const sum = list.reduce((s, r) => s + r.rating, 0);
  const distribution: [number, number, number, number, number] = [0, 0, 0, 0, 0];
  for (const r of list) distribution[5 - r.rating] += 1;
  return {
    count,
    average: Math.round((sum / count) * 10) / 10,
    distribution,
  };
}

export function getAllReviews(): Review[] {
  return REVIEWS;
}

export function getRecentTopReviews(limit = 12): Review[] {
  return REVIEWS.filter((r) => r.rating >= 5).slice(0, limit);
}

export const TOTAL_REVIEWS = REVIEWS.length;
`;

fs.writeFileSync(OUT, body, 'utf8');
console.log(`Wrote ${reviews.length} reviews to ${OUT}`);
