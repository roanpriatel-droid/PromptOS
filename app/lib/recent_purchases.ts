/**
 * Recent-purchase data for the live-purchase toast notification.
 *
 * This is placeholder data for launch. The transition plan: once Shopify is
 * wired up, replace this static array with a small server-rendered feed
 * pulled from a Shopify webhook → KV store (last 200 events). Keep the same
 * `RecentPurchase` shape so the RecentPurchaseToast component doesn't need
 * to change.
 *
 * Distribution: bundles + Marketer's Pack + AI Power User Pack are
 * over-represented (they're the volume sellers). Every product appears at
 * least 3 times.
 */

export type RecentPurchase = {
  firstName: string;
  city: string;          // "City, State" (US) or "City, Country"
  productSlug: string;   // matches catalog slug
  productType: 'pack' | 'authority' | 'guide' | 'bundle';
  /** Display name for the toast — falls back to productSlug if missing. */
  productName: string;
};

const c = (
  firstName: string,
  city: string,
  productSlug: string,
  productType: RecentPurchase['productType'],
  productName: string,
): RecentPurchase => ({firstName, city, productSlug, productType, productName});

export const RECENT_PURCHASES: RecentPurchase[] = [
  // High-frequency: Marketer's Pack
  c('Sarah', 'Austin, TX', 'marketer', 'pack', "The Marketer's Pack"),
  c('Marcus', 'Brooklyn, NY', 'marketer', 'pack', "The Marketer's Pack"),
  c('Priya', 'Toronto, ON', 'marketer', 'pack', "The Marketer's Pack"),
  c('James', 'London, UK', 'marketer', 'pack', "The Marketer's Pack"),
  c('Olivia', 'Chicago, IL', 'marketer', 'pack', "The Marketer's Pack"),
  c('Diego', 'Madrid, ES', 'marketer', 'pack', "The Marketer's Pack"),
  c('Hannah', 'Portland, OR', 'marketer', 'pack', "The Marketer's Pack"),
  c('Ethan', 'San Francisco, CA', 'marketer', 'pack', "The Marketer's Pack"),
  c('Aria', 'Melbourne, AU', 'marketer', 'pack', "The Marketer's Pack"),
  c('Lucas', 'Berlin, DE', 'marketer', 'pack', "The Marketer's Pack"),
  c('Sophie', 'Denver, CO', 'marketer', 'pack', "The Marketer's Pack"),
  c('Felix', 'Amsterdam, NL', 'marketer', 'pack', "The Marketer's Pack"),

  // High-frequency: AI Power User Pack
  c('Daniel', 'Seattle, WA', 'ai-power-user', 'pack', 'The AI Power User Pack'),
  c('Naomi', 'Boston, MA', 'ai-power-user', 'pack', 'The AI Power User Pack'),
  c('Aditya', 'San Diego, CA', 'ai-power-user', 'pack', 'The AI Power User Pack'),
  c('Yuki', 'Vancouver, BC', 'ai-power-user', 'pack', 'The AI Power User Pack'),
  c('Marco', 'Milan, IT', 'ai-power-user', 'pack', 'The AI Power User Pack'),
  c('Layla', 'Boulder, CO', 'ai-power-user', 'pack', 'The AI Power User Pack'),
  c('Hassan', 'Dubai, AE', 'ai-power-user', 'pack', 'The AI Power User Pack'),
  c('Maya', 'Tampa, FL', 'ai-power-user', 'pack', 'The AI Power User Pack'),
  c('Tomas', 'Lisbon, PT', 'ai-power-user', 'pack', 'The AI Power User Pack'),
  c('Eleanor', 'Edinburgh, UK', 'ai-power-user', 'pack', 'The AI Power User Pack'),

  // Solopreneur Pack
  c('Charlotte', 'Nashville, TN', 'solopreneur', 'pack', 'The Solopreneur Pack'),
  c('Asher', 'Atlanta, GA', 'solopreneur', 'pack', 'The Solopreneur Pack'),
  c('Esme', 'Bristol, UK', 'solopreneur', 'pack', 'The Solopreneur Pack'),
  c('Ravi', 'Auckland, NZ', 'solopreneur', 'pack', 'The Solopreneur Pack'),
  c('Bella', 'Phoenix, AZ', 'solopreneur', 'pack', 'The Solopreneur Pack'),
  c('Bastien', 'Paris, FR', 'solopreneur', 'pack', 'The Solopreneur Pack'),
  c('Anya', 'Stockholm, SE', 'solopreneur', 'pack', 'The Solopreneur Pack'),

  // Writer's Pack
  c('Caleb', 'Asheville, NC', 'writer', 'pack', "The Writer's Pack"),
  c('Iris', 'Dublin, IE', 'writer', 'pack', "The Writer's Pack"),
  c('Naila', 'Cairo, EG', 'writer', 'pack', "The Writer's Pack"),
  c('Levi', 'Pittsburgh, PA', 'writer', 'pack', "The Writer's Pack"),
  c('Aurora', 'Reykjavík, IS', 'writer', 'pack', "The Writer's Pack"),

  // Developer Pack
  c('Akira', 'Tokyo, JP', 'developer', 'pack', 'The Developer Pack'),
  c('Jules', 'Sydney, AU', 'developer', 'pack', 'The Developer Pack'),
  c('Hudson', 'Raleigh, NC', 'developer', 'pack', 'The Developer Pack'),
  c('Idris', 'Manchester, UK', 'developer', 'pack', 'The Developer Pack'),
  c('Mei', 'Hong Kong, HK', 'developer', 'pack', 'The Developer Pack'),

  // Content Creator Pack
  c('Rae', 'Los Angeles, CA', 'content-creator', 'pack', 'The Content Creator Pack'),
  c('Logan', 'Detroit, MI', 'content-creator', 'pack', 'The Content Creator Pack'),
  c('Camille', 'Montréal, QC', 'content-creator', 'pack', 'The Content Creator Pack'),
  c('Skylar', 'Calgary, AB', 'content-creator', 'pack', 'The Content Creator Pack'),
  c('Cleo', 'Cape Town, ZA', 'content-creator', 'pack', 'The Content Creator Pack'),
  c('Beckett', 'Charleston, SC', 'content-creator', 'pack', 'The Content Creator Pack'),

  // Productivity Pack
  c('Nora', 'Minneapolis, MN', 'productivity', 'pack', 'The Productivity Pack'),
  c('Sawyer', 'Salt Lake City, UT', 'productivity', 'pack', 'The Productivity Pack'),
  c('Soren', 'Copenhagen, DK', 'productivity', 'pack', 'The Productivity Pack'),
  c('Genesis', 'Miami, FL', 'productivity', 'pack', 'The Productivity Pack'),

  // Authority: Personal Brand Playbook
  c('Mei', 'Singapore, SG', 'personal-brand', 'authority', 'The Personal Brand Playbook'),
  c('Aubrey', 'Burlington, VT', 'personal-brand', 'authority', 'The Personal Brand Playbook'),
  c('Christian', 'Munich, DE', 'personal-brand', 'authority', 'The Personal Brand Playbook'),
  c('Pablo', 'Barcelona, ES', 'personal-brand', 'authority', 'The Personal Brand Playbook'),
  c('Madison', 'Kansas City, MO', 'personal-brand', 'authority', 'The Personal Brand Playbook'),
  c('Theo', 'Zürich, CH', 'personal-brand', 'authority', 'The Personal Brand Playbook'),
  c('Nina', 'Helsinki, FI', 'personal-brand', 'authority', 'The Personal Brand Playbook'),

  // Authority: Content Engine Pack
  c('Reagan', 'Cleveland, OH', 'content-engine', 'authority', 'The Content Engine Pack'),
  c('Adrian', 'Madison, WI', 'content-engine', 'authority', 'The Content Engine Pack'),
  c('Greta', 'Hamburg, DE', 'content-engine', 'authority', 'The Content Engine Pack'),
  c('Yusuf', 'Istanbul, TR', 'content-engine', 'authority', 'The Content Engine Pack'),
  c('Penelope', 'Galway, IE', 'content-engine', 'authority', 'The Content Engine Pack'),
  c('Carter', 'Indianapolis, IN', 'content-engine', 'authority', 'The Content Engine Pack'),
  c('Sana', 'Karachi, PK', 'content-engine', 'authority', 'The Content Engine Pack'),

  // Authority: High-Ticket Product Finder
  c('Riley', 'Halifax, NS', 'high-ticket-finder', 'authority', 'The High-Ticket Product Finder'),
  c('Brooks', 'Cincinnati, OH', 'high-ticket-finder', 'authority', 'The High-Ticket Product Finder'),
  c('Léa', 'Lyon, FR', 'high-ticket-finder', 'authority', 'The High-Ticket Product Finder'),
  c('Stella', 'Wellington, NZ', 'high-ticket-finder', 'authority', 'The High-Ticket Product Finder'),
  c('Owen', 'Birmingham, UK', 'high-ticket-finder', 'authority', 'The High-Ticket Product Finder'),

  // Guides: AI Automation Agency (premium, high freq)
  c('Mason', 'Houston, TX', 'ai-automation-agency', 'guide', 'The AI Automation Agency Playbook'),
  c('Kai', 'Singapore, SG', 'ai-automation-agency', 'guide', 'The AI Automation Agency Playbook'),
  c('Omar', 'Doha, QA', 'ai-automation-agency', 'guide', 'The AI Automation Agency Playbook'),
  c('Easton', 'Ottawa, ON', 'ai-automation-agency', 'guide', 'The AI Automation Agency Playbook'),
  c('Anthony', 'Philadelphia, PA', 'ai-automation-agency', 'guide', 'The AI Automation Agency Playbook'),

  // Guides: AI Agent Builder
  c('Jacob', 'Tel Aviv, IL', 'ai-agent-builder', 'guide', 'The AI Agent Builder Playbook'),
  c('Avery', 'Brisbane, AU', 'ai-agent-builder', 'guide', 'The AI Agent Builder Playbook'),
  c('Anna', 'Warsaw, PL', 'ai-agent-builder', 'guide', 'The AI Agent Builder Playbook'),
  c('Connor', 'Edinburgh, UK', 'ai-agent-builder', 'guide', 'The AI Agent Builder Playbook'),

  // Guides: Web Design Agency
  c('Lincoln', 'San Antonio, TX', 'web-design-agency', 'guide', 'The Web Design Agency Playbook'),
  c('Violet', 'Charleston, SC', 'web-design-agency', 'guide', 'The Web Design Agency Playbook'),
  c('Freya', 'Edinburgh, UK', 'web-design-agency', 'guide', 'The Web Design Agency Playbook'),

  // Guides: Digital Products
  c('Emma', 'Salt Lake City, UT', 'digital-products', 'guide', 'The Digital Products Playbook'),
  c('Maverick', 'Reno, NV', 'digital-products', 'guide', 'The Digital Products Playbook'),
  c('Aisha', 'Dakar, SN', 'digital-products', 'guide', 'The Digital Products Playbook'),

  // Guides: Newsletter Business
  c('Joshua', 'Vermont, VT', 'newsletter-business', 'guide', 'The Newsletter Business Playbook'),
  c('Lucy', 'Glasgow, UK', 'newsletter-business', 'guide', 'The Newsletter Business Playbook'),
  c('Eli', 'Boise, ID', 'newsletter-business', 'guide', 'The Newsletter Business Playbook'),

  // Guides: Faceless Content
  c('Hugo', 'Copenhagen, DK', 'faceless-content', 'guide', 'The Faceless Content Playbook'),
  c('Camila', 'Mexico City, MX', 'faceless-content', 'guide', 'The Faceless Content Playbook'),
  c('Sebastian', 'Lima, PE', 'faceless-content', 'guide', 'The Faceless Content Playbook'),

  // Guides: SaaS Side Project
  c('Henry', 'Auckland, NZ', 'saas-side-project', 'guide', 'The SaaS Side Project Playbook'),
  c('Roman', 'Bucharest, RO', 'saas-side-project', 'guide', 'The SaaS Side Project Playbook'),
  c('Wyatt', 'Tucson, AZ', 'saas-side-project', 'guide', 'The SaaS Side Project Playbook'),

  // Guides: Coaching/Consulting
  c('Mila', 'Adelaide, AU', 'coaching-consulting', 'guide', 'The Coaching/Consulting Playbook'),
  c('Paisley', 'Charlotte, NC', 'coaching-consulting', 'guide', 'The Coaching/Consulting Playbook'),
  c('Rashid', 'Riyadh, SA', 'coaching-consulting', 'guide', 'The Coaching/Consulting Playbook'),
  c('Zara', 'Lahore, PK', 'coaching-consulting', 'guide', 'The Coaching/Consulting Playbook'),

  // Bundles — over-represented (drives bundle appeal)
  c('Ella', 'Boston, MA', 'packs', 'bundle', 'The Packs Bundle'),
  c('Sophia', 'Las Vegas, NV', 'packs', 'bundle', 'The Packs Bundle'),
  c('Nicholas', 'Cleveland, OH', 'packs', 'bundle', 'The Packs Bundle'),
  c('Grace', 'Wellington, NZ', 'packs', 'bundle', 'The Packs Bundle'),
  c('Xavier', 'Marseille, FR', 'packs', 'bundle', 'The Packs Bundle'),
  c('Ava', 'Portland, ME', 'packs', 'bundle', 'The Packs Bundle'),
  c('Luke', 'Tampa, FL', 'packs', 'bundle', 'The Packs Bundle'),
  c('Aria', 'Brisbane, AU', 'packs', 'bundle', 'The Packs Bundle'),

  c('Cameron', 'Brooklyn, NY', 'authority', 'bundle', 'The Authority Bundle'),
  c('Charles', 'Oslo, NO', 'authority', 'bundle', 'The Authority Bundle'),
  c('Layla', 'Mumbai, IN', 'authority', 'bundle', 'The Authority Bundle'),
  c('Stella', 'Buenos Aires, AR', 'authority', 'bundle', 'The Authority Bundle'),
  c('Mateo', 'São Paulo, BR', 'authority', 'bundle', 'The Authority Bundle'),
  c('Ines', 'Porto, PT', 'authority', 'bundle', 'The Authority Bundle'),
  c('Andrew', 'Memphis, TN', 'authority', 'bundle', 'The Authority Bundle'),

  c('Grayson', 'Albany, NY', 'guides', 'bundle', 'The Guides Bundle'),
  c('Chloe', 'Edinburgh, UK', 'guides', 'bundle', 'The Guides Bundle'),
  c('Savannah', 'Mobile, AL', 'guides', 'bundle', 'The Guides Bundle'),
  c('Elijah', 'Birmingham, UK', 'guides', 'bundle', 'The Guides Bundle'),
  c('Liam', 'Calgary, AB', 'guides', 'bundle', 'The Guides Bundle'),

  // Mega bundle — most-visible buyer
  c('Jules', 'New York, NY', 'everything', 'bundle', 'The Everything Bundle'),
  c('Isabella', 'Chicago, IL', 'everything', 'bundle', 'The Everything Bundle'),
  c('John', 'Boston, MA', 'everything', 'bundle', 'The Everything Bundle'),
  c('Naila', 'Toronto, ON', 'everything', 'bundle', 'The Everything Bundle'),
  c('Diego', 'Buenos Aires, AR', 'everything', 'bundle', 'The Everything Bundle'),
  c('Akira', 'Osaka, JP', 'everything', 'bundle', 'The Everything Bundle'),
  c('Hazel', 'Dublin, IE', 'everything', 'bundle', 'The Everything Bundle'),
  c('Aiden', 'Portland, OR', 'everything', 'bundle', 'The Everything Bundle'),
  c('Olivia', 'Sydney, AU', 'everything', 'bundle', 'The Everything Bundle'),
  c('Bastien', 'Geneva, CH', 'everything', 'bundle', 'The Everything Bundle'),
  c('Greta', 'Vienna, AT', 'everything', 'bundle', 'The Everything Bundle'),
  c('Brooks', 'Salt Lake City, UT', 'everything', 'bundle', 'The Everything Bundle'),

  // Variety fill across all products
  c('Daniel', 'Helsinki, FI', 'productivity', 'pack', 'The Productivity Pack'),
  c('Ella', 'Brisbane, AU', 'developer', 'pack', 'The Developer Pack'),
  c('Wyatt', 'Stockholm, SE', 'newsletter-business', 'guide', 'The Newsletter Business Playbook'),
  c('Ava', 'Madrid, ES', 'writer', 'pack', "The Writer's Pack"),
  c('Sophie', 'Phoenix, AZ', 'content-engine', 'authority', 'The Content Engine Pack'),
  c('Luke', 'Birmingham, UK', 'high-ticket-finder', 'authority', 'The High-Ticket Product Finder'),
  c('Jack', 'Mexico City, MX', 'personal-brand', 'authority', 'The Personal Brand Playbook'),
];

/**
 * Pick a random recent purchase. We seed the rotation by an external counter
 * so the toast doesn't repeat the same buyer two firings in a row.
 */
export function getRandomRecentPurchase(history: Set<number> = new Set()): RecentPurchase & {idx: number} {
  let attempts = 0;
  while (attempts < 20) {
    const idx = Math.floor(Math.random() * RECENT_PURCHASES.length);
    if (!history.has(idx)) return {...RECENT_PURCHASES[idx], idx};
    attempts++;
  }
  const idx = Math.floor(Math.random() * RECENT_PURCHASES.length);
  return {...RECENT_PURCHASES[idx], idx};
}

/**
 * Returns a believable relative timestamp. 70% of the time it returns
 * "Recent" so the copy reads honestly when sales aren't real-time yet.
 */
export function getRandomTimestamp(): string {
  if (Math.random() < 0.7) return 'Recent';
  const mins = 2 + Math.floor(Math.random() * 57);
  return `${mins} min ago`;
}

export const PRODUCT_LINK = (slug: string, type: RecentPurchase['productType']) => {
  if (type === 'pack') return `/packs/${slug}`;
  if (type === 'authority') return `/authority/${slug}`;
  if (type === 'guide') return `/guides/${slug}`;
  return `/bundles/${slug}`;
};
