import type {Route} from './+types/[sitemap.xml]';
import {PACKS, GUIDES, AUTHORITY, BUNDLES} from '~/lib/catalog';

const STATIC_ROUTES: Array<{path: string; priority: number; changefreq: string}> = [
  {path: '/', priority: 1.0, changefreq: 'weekly'},
  {path: '/packs', priority: 0.9, changefreq: 'weekly'},
  {path: '/guides', priority: 0.9, changefreq: 'weekly'},
  {path: '/authority', priority: 0.9, changefreq: 'weekly'},
  {path: '/bundles', priority: 0.95, changefreq: 'weekly'},
  {path: '/bundles/everything', priority: 0.95, changefreq: 'weekly'},
  {path: '/why-promptos', priority: 0.8, changefreq: 'monthly'},
  {path: '/method', priority: 0.6, changefreq: 'monthly'},
  {path: '/about', priority: 0.6, changefreq: 'monthly'},
  {path: '/reviews', priority: 0.7, changefreq: 'weekly'},
  {path: '/updates', priority: 0.6, changefreq: 'weekly'},
  {path: '/contact', priority: 0.4, changefreq: 'yearly'},
  {path: '/legal/terms', priority: 0.3, changefreq: 'yearly'},
  {path: '/privacy', priority: 0.3, changefreq: 'yearly'},
  {path: '/refunds', priority: 0.3, changefreq: 'yearly'},
  {path: '/license', priority: 0.3, changefreq: 'yearly'},
  {path: '/legal/cookies', priority: 0.3, changefreq: 'yearly'},
  {path: '/legal/dmca', priority: 0.3, changefreq: 'yearly'},
  {path: '/legal/acceptable-use', priority: 0.3, changefreq: 'yearly'},
];

export async function loader({request}: Route.LoaderArgs) {
  const origin = new URL(request.url).origin;
  const lastmod = new Date().toISOString().split('T')[0];

  const urls: Array<{loc: string; priority: number; changefreq: string}> = [];

  for (const r of STATIC_ROUTES) {
    urls.push({loc: `${origin}${r.path}`, priority: r.priority, changefreq: r.changefreq});
  }
  for (const p of PACKS) {
    urls.push({loc: `${origin}/packs/${p.slug}`, priority: 0.85, changefreq: 'weekly'});
  }
  for (const g of GUIDES) {
    urls.push({loc: `${origin}/guides/${g.slug}`, priority: 0.85, changefreq: 'weekly'});
  }
  for (const a of AUTHORITY) {
    urls.push({loc: `${origin}/authority/${a.slug}`, priority: 0.85, changefreq: 'weekly'});
  }
  for (const b of BUNDLES) {
    urls.push({loc: `${origin}/bundles/${b.slug}`, priority: 0.9, changefreq: 'weekly'});
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(2)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60 * 12}`,
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
