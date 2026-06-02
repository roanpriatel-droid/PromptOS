import {redirect} from 'react-router';
import type {Route} from './+types/$';

/**
 * Catch-all route — handles every URL that no other route matched.
 *
 * v3.9c-tactical: pre-empt the 404 with a small redirect table for
 * legacy/external links that might still be linked from IG bios,
 * posted reels, or back-channel DMs. New entries here are equivalent
 * to a 301 redirect at the edge — anyone landing on the old URL
 * gracefully resolves to the canonical new one. Throw a 404 only
 * after the table misses.
 *
 * Keep this list focused: only add an entry when the legacy URL has
 * a definite canonical replacement AND has been linked externally.
 */
const LEGACY_REDIRECTS: ReadonlyArray<readonly [RegExp, string]> = [
  // The Packs Bundle once lived at /packs/complete-bundle before the
  // /bundles/{slug} convention. ProductHeroV2 referenced this URL
  // until v3.9c-tactical fixed the inline ref.
  [/^\/packs\/complete-bundle\/?$/i, '/bundles/packs'],
  // Authority products briefly lived under /bundles/* during an
  // earlier scope; canonical is /authority/{slug}.
  [/^\/bundles\/personal-brand\/?$/i, '/authority/personal-brand'],
  [/^\/bundles\/content-engine\/?$/i, '/authority/content-engine'],
  [/^\/bundles\/high-ticket-finder\/?$/i, '/authority/high-ticket-finder'],
  // Earlier the mega bundle was called /bundles/mega; canonical now
  // uses the product slug "everything".
  [/^\/bundles\/mega\/?$/i, '/bundles/everything'],
];

export async function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  for (const [pattern, target] of LEGACY_REDIRECTS) {
    if (pattern.test(pathname)) {
      throw redirect(target, 301);
    }
  }
  throw new Response(`${pathname} not found`, {status: 404});
}

export default function CatchAllPage() {
  return null;
}
