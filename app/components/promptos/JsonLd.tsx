/**
 * Server-rendered JSON-LD script tag. React's dangerouslySetInnerHTML keeps the
 * payload literal and avoids HTML-escaping of quotes inside JSON.
 */
export function JsonLd({data}: {data: object | object[]}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}

export const SITE_URL = 'https://promptos.store';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Promptos',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [
      'https://x.com/promptos',
      'https://github.com/promptos',
      'https://youtube.com/@promptos',
      'https://promptos.substack.com',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@promptos.store',
        availableLanguage: ['en'],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Promptos',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(crumbs: Array<{name: string; path: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

export function productSchema(opts: {
  name: string;
  description: string;
  slug: string;
  category: 'Packs' | 'Playbooks' | 'Authority' | 'Bundles';
  priceUSD: number;
  reviewCount: number;
  averageRating: number;
  /** Optional fully-qualified image URL (OG image) for the product. */
  image?: string;
  /** Optional SKU / product code; defaults to the slug. */
  sku?: string;
}) {
  const pathBase: Record<string, string> = {
    Packs: '/packs',
    Playbooks: '/guides',
    Authority: '/authority',
    Bundles: '/bundles',
  };
  const url = `${SITE_URL}${pathBase[opts.category]}/${opts.slug}`;
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    brand: {'@type': 'Brand', name: 'Promptos'},
    category: opts.category,
    sku: opts.sku ?? opts.slug,
    url,
    offers: {
      '@type': 'Offer',
      price: opts.priceUSD,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url,
    },
  };
  if (opts.image) node.image = opts.image;
  // Only emit aggregateRating when there's at least one real review — Google
  // surfaces stars from this block and rejects payloads with reviewCount=0.
  if (opts.reviewCount > 0) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: opts.averageRating.toFixed(2),
      reviewCount: opts.reviewCount,
      bestRating: '5',
      worstRating: '1',
    };
  }
  return node;
}

/**
 * Schema-org Review subtype for the top reviews shown on a product
 * page. We embed a small set of reviews (not the entire collection)
 * so the JSON-LD payload stays under Google's recommended size and
 * search rich snippets show real, useful quotes.
 */
export function reviewSchema(opts: {
  author: string;
  rating: number;
  title?: string;
  body: string;
  /** ISO date when the review was written. Optional but recommended. */
  datePublished?: string;
}) {
  const node: Record<string, unknown> = {
    '@type': 'Review',
    author: {'@type': 'Person', name: opts.author},
    reviewRating: {
      '@type': 'Rating',
      ratingValue: opts.rating,
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: opts.body,
  };
  if (opts.title) node.name = opts.title;
  if (opts.datePublished) node.datePublished = opts.datePublished;
  return node;
}

/**
 * Helper: attaches an array of Review subtypes to a productSchema()
 * payload. Mutates `productNode` in place and returns it.
 */
export function withReviews<T extends object>(
  productNode: T,
  reviews: Array<{
    author: string;
    rating: number;
    title?: string;
    body: string;
    datePublished?: string;
  }>,
): T {
  if (reviews.length === 0) return productNode;
  (productNode as Record<string, unknown>).review = reviews.map(reviewSchema);
  return productNode;
}

/**
 * Schema-org ItemList for index pages (/packs, /guides, /authority,
 * /bundles, and the homepage product showcases). Helps Google show
 * the collection as a structured list in search.
 */
export function itemListSchema(opts: {
  name: string;
  items: Array<{name: string; url: string; image?: string; description?: string}>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: item.url,
      name: item.name,
      ...(item.image ? {image: item.image} : {}),
      ...(item.description ? {description: item.description} : {}),
    })),
  };
}

export function faqSchema(items: Array<{q: string; a: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
    })),
  };
}
