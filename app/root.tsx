import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import type {Route} from './+types/root';
import favicon from '~/assets/favicon.svg';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import appStyles from '~/styles/app.css?url';
// v3.9c-tactical P7 — self-hosted fonts. Loaded first so @font-face
// declarations exist before any other stylesheet references them.
import fontsStyles from './styles/fonts.css?url';
import tailwindCss from './styles/tailwind.css?url';
import promptosStyles from './styles/promptos.css?url';
import promptosV2Styles from './styles/promptos-v2.css?url';
import promptosV3Styles from './styles/promptos-v3.css?url';
import whyPromptosStyles from './styles/why-promptos.css?url';
import promptosV32Styles from './styles/promptos-v32.css?url';
import promptosV33Styles from './styles/promptos-v33.css?url';
import promptosV34Styles from './styles/promptos-v34.css?url';
import promptosV38aStyles from './styles/promptos-v38a.css?url';
import promptosV39aStyles from './styles/promptos-v39a.css?url';
import {PageLayout} from './components/PageLayout';
import {RecentPurchaseToast} from './components/promptos/RecentPurchaseToast';
import {WhatsNewBanner} from './components/promptos/WhatsNewBanner';
import {LaunchBar} from './components/promptos/LaunchBar';
import {ExitIntentModal} from './components/promptos/ExitIntentModal';
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from './components/promptos/JsonLd';

export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {rel: 'preconnect', href: 'https://shop.app'},
    // Favicon set generated via scripts/generate-favicons.mjs.
    {rel: 'icon', href: '/favicon.ico', sizes: 'any'},
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
    {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
    {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
    {rel: 'apple-touch-icon', href: '/apple-touch-icon.png'},
    {rel: 'manifest', href: '/site.webmanifest'},
  ];
}

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {header};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const {storefront, customerAccount, cart} = context;

  // defer the footer query (below the fold)
  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer', // Adjust to your footer menu handle
      },
    })
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6B46C1" />
        <meta name="msapplication-TileColor" content="#6B46C1" />
        <meta property="og:image" content="/og-default.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="/og-default.png" />
        {/* v3.9c-tactical P7: Google Fonts preconnects removed — fonts
            now self-hosted via @fontsource (loaded by fonts.css below). */}
        <link rel="stylesheet" href={fontsStyles}></link>
        <link rel="stylesheet" href={tailwindCss}></link>
        <link rel="stylesheet" href={appStyles}></link>
        <link rel="stylesheet" href={promptosStyles}></link>
        <link rel="stylesheet" href={promptosV2Styles}></link>
        <link rel="stylesheet" href={promptosV3Styles}></link>
        <link rel="stylesheet" href={whyPromptosStyles}></link>
        <link rel="stylesheet" href={promptosV32Styles}></link>
        <link rel="stylesheet" href={promptosV33Styles}></link>
        <link rel="stylesheet" href={promptosV34Styles}></link>
        <link rel="stylesheet" href={promptosV38aStyles}></link>
        <link rel="stylesheet" href={promptosV39aStyles}></link>
        <Meta />
        <Links />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<RootLoader>('root');

  if (!data) {
    return <Outlet />;
  }

  return (
    <Analytics.Provider
      cart={data.cart}
      shop={data.shop}
      consent={data.consent}
    >
      <LaunchBar />
      <WhatsNewBanner />
      <PageLayout {...data}>
        <Outlet />
      </PageLayout>
      <RecentPurchaseToast />
      <ExitIntentModal />
    </Analytics.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorStatus = 500;
  let errorMessage: string | undefined;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    const data = error?.data;
    errorMessage = typeof data === 'string' ? data : data?.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const is404 = errorStatus === 404;

  return (
    <main className="notfound">
      <div className="notfound-inner">
        <div className="glitch" aria-hidden>{errorStatus}</div>
        <h1>
          {is404 ? 'This page took a wrong prompt.' : 'Something tripped on our end.'}
        </h1>
        <p>
          {is404
            ? "It may have moved or never existed. Try one of these instead."
            : "We hit an error rendering this page. The team has seen worse and the catalog is still up."}
        </p>

        {is404 && (
          <div className="notfound-cards" aria-label="Suggested destinations">
            <a href="/packs" className="notfound-card">
              <div className="notfound-card-eyebrow">Tier 1</div>
              <h3>Prompt Packs</h3>
              <p>Battle-tested prompts for the work you do every day.</p>
              <span className="notfound-card-cta">Browse packs <span aria-hidden>→</span></span>
            </a>
            <a href="/authority" className="notfound-card">
              <div className="notfound-card-eyebrow">Tier 2 · New</div>
              <h3>Authority</h3>
              <p>Build an audience. Productize your expertise.</p>
              <span className="notfound-card-cta">Browse Authority <span aria-hidden>→</span></span>
            </a>
            <a href="/guides" className="notfound-card">
              <div className="notfound-card-eyebrow">Tier 3</div>
              <h3>Playbooks</h3>
              <p>Real playbooks for the businesses operators are starting.</p>
              <span className="notfound-card-cta">Browse playbooks <span aria-hidden>→</span></span>
            </a>
          </div>
        )}

        <form action="/" className="notfound-search" role="search">
          <input
            type="search"
            name="q"
            placeholder="Search for a pack, playbook, or topic"
            aria-label="Search the catalog"
          />
          <button type="submit">Search</button>
        </form>

        <div className="actions">
          <a href="/" className="btn btn-large btn-gradient btn-arrow">
            Back to the homepage
          </a>
          <a href="/bundles/everything" className="btn btn-large btn-secondary">
            See the bundle
          </a>
        </div>
        {errorMessage && !is404 && (
          <pre style={{marginTop: 40, fontSize: 12, color: 'var(--fg-3)', whiteSpace: 'pre-wrap'}}>
            {errorMessage}
          </pre>
        )}
      </div>
    </main>
  );
}
