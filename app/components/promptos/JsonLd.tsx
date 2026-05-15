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
}) {
  const pathBase: Record<string, string> = {
    Packs: '/packs',
    Playbooks: '/guides',
    Authority: '/authority',
    Bundles: '/bundles',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    brand: {'@type': 'Brand', name: 'Promptos'},
    category: opts.category,
    url: `${SITE_URL}${pathBase[opts.category]}/${opts.slug}`,
    offers: {
      '@type': 'Offer',
      price: opts.priceUSD,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${pathBase[opts.category]}/${opts.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: opts.averageRating.toFixed(2),
      reviewCount: opts.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
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
