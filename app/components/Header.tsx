/**
 * Promptos top nav v3 — three mega-menus (Packs / Guides / Bundles),
 * sticky scroll behaviour, mobile drawer with stacked accordion sections.
 */

import {Suspense, useEffect, useRef, useState} from 'react';
import {Await, Link, NavLink, useAsyncValue, useLocation} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Wordmark} from '~/components/promptos/Wordmark';
import {MegaMenuPanel} from '~/components/promptos/MegaMenuPanel';
import {AUTHORITY, BUNDLES, GUIDES, PACKS} from '~/lib/catalog';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

const FLAT_NAV_AFTER = [
  {label: 'Reviews', to: '/reviews', match: (p: string) => p.startsWith('/reviews')},
  {label: 'Method', to: '/method', match: (p: string) => p.startsWith('/method')},
  {label: 'About', to: '/about', match: (p: string) => p.startsWith('/about')},
];

const WHY_US = {
  label: 'Why Us',
  to: '/why-promptos',
  match: (p: string) => p.startsWith('/why-promptos'),
};

const MEGA_BUNDLE_SLUG = 'everything';

type DropdownKey = 'packs' | 'authority' | 'guides' | 'bundles' | null;

export function Header({isLoggedIn, cart}: HeaderProps) {
  const {pathname} = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<DropdownKey>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [drawerOpen]);

  const enter = (k: DropdownKey) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setOpen(k);
  };
  const leave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setOpen(null), 140);
  };

  const packsActive = pathname.startsWith('/packs');
  const authorityActive = pathname.startsWith('/authority');
  const guidesActive = pathname.startsWith('/guides');
  const bundlesActive = pathname.startsWith('/bundles');

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <nav className={`appnav v2${scrolled ? ' is-scrolled' : ''}`}>
        <div className="appnav-inner">
          <Link to="/" prefetch="intent" className="appnav-brand" aria-label="Promptos home">
            <Wordmark width={160} />
          </Link>

          <div className="appnav-links">
            <NavLink
              to="/"
              end
              prefetch="intent"
              className={`appnav-link${pathname === '/' ? ' is-active' : ''}`}
            >
              Home
            </NavLink>

            <NavLink
              to={WHY_US.to}
              prefetch="intent"
              className={`appnav-link appnav-link-emphasis${WHY_US.match(pathname) ? ' is-active' : ''}`}
            >
              {WHY_US.label}
            </NavLink>

            <MegaTrigger
              label="Packs"
              isOpen={open === 'packs'}
              isActive={packsActive}
              onEnter={() => enter('packs')}
              onLeave={leave}
              onClick={() => setOpen(open === 'packs' ? null : 'packs')}
            >
              <MegaMenuPanel open={open === 'packs'} variant="packs" />
            </MegaTrigger>

            <MegaTrigger
              label="Authority"
              isOpen={open === 'authority'}
              isActive={authorityActive}
              onEnter={() => enter('authority')}
              onLeave={leave}
              onClick={() => setOpen(open === 'authority' ? null : 'authority')}
            >
              <MegaMenuPanel open={open === 'authority'} variant="authority" />
            </MegaTrigger>

            <MegaTrigger
              label="Bundles"
              isOpen={open === 'bundles'}
              isActive={bundlesActive}
              onEnter={() => enter('bundles')}
              onLeave={leave}
              onClick={() => setOpen(open === 'bundles' ? null : 'bundles')}
            >
              <MegaMenuPanel open={open === 'bundles'} variant="bundles" />
            </MegaTrigger>

            <MegaTrigger
              label="Guides"
              isOpen={open === 'guides'}
              isActive={guidesActive}
              onEnter={() => enter('guides')}
              onLeave={leave}
              onClick={() => setOpen(open === 'guides' ? null : 'guides')}
            >
              <MegaMenuPanel open={open === 'guides'} variant="guides" />
            </MegaTrigger>

            {FLAT_NAV_AFTER.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                prefetch="intent"
                className={`appnav-link${item.match(pathname) ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="appnav-utility">
            <SearchToggle />
            <AccountLink isLoggedIn={isLoggedIn} />
            <CartToggle cart={cart} />
            <Link
              to={`/bundles/${MEGA_BUNDLE_SLUG}`}
              prefetch="intent"
              className="appnav-cta appnav-cta-pill"
              aria-label="Everything Bundle, $798 USD, save $914"
            >
              <span className="appnav-cta-savetag" aria-hidden>Save $914</span>
              <span className="appnav-cta-dot" aria-hidden />
              <span className="appnav-cta-label">Everything</span>
              <span className="appnav-cta-divider" aria-hidden />
              <span className="appnav-cta-price">$798</span>
            </Link>
            <button
              type="button"
              className={`hamburger${drawerOpen ? ' is-open' : ''}`}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

function MegaTrigger({
  label,
  isOpen,
  isActive,
  onEnter,
  onLeave,
  onClick,
  children,
}: {
  label: string;
  isOpen: boolean;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} style={{position: 'relative'}}>
      <button
        type="button"
        className={`appnav-link${isActive ? ' is-active' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={onClick}
      >
        {label}
        <svg
          className="caret"
          viewBox="0 0 12 12"
          width="10"
          height="10"
          fill="none"
          aria-hidden
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {children}
    </div>
  );
}

function MobileDrawer({open, onClose}: {open: boolean; onClose: () => void}) {
  const [section, setSection] = useState<DropdownKey>(null);
  return (
    <>
      <div
        className={`mobile-overlay${open ? ' is-open' : ''}`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`mobile-drawer${open ? ' is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="mobile-drawer-head">
          <Wordmark width={120} />
          <button
            type="button"
            className="hamburger is-open"
            aria-label="Close menu"
            onClick={onClose}
          >
            <span /><span /><span />
          </button>
        </div>

        <ul className="mobile-nav-list">
          <li><Link to="/" onClick={onClose} prefetch="intent">Home</Link></li>
          <li><Link to="/why-promptos" onClick={onClose} prefetch="intent">Why Us</Link></li>

          <MobileSection
            label="Packs"
            open={section === 'packs'}
            onToggle={() => setSection(section === 'packs' ? null : 'packs')}
          >
            {PACKS.map((p) => (
              <li key={p.slug}>
                <Link to={`/packs/${p.slug}`} onClick={onClose} prefetch="intent">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/packs" onClick={onClose} prefetch="intent" style={{color: 'var(--promptos-purple)'}}>
                See all packs →
              </Link>
            </li>
          </MobileSection>

          <MobileSection
            label="Authority"
            open={section === 'authority'}
            onToggle={() => setSection(section === 'authority' ? null : 'authority')}
          >
            {AUTHORITY.map((a) => (
              <li key={a.slug}>
                <Link to={`/authority/${a.slug}`} onClick={onClose} prefetch="intent">
                  {a.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/bundles/authority" onClick={onClose} prefetch="intent" style={{color: 'var(--promptos-purple)'}}>
                The Authority Bundle, $249
              </Link>
            </li>
            <li>
              <Link to="/authority" onClick={onClose} prefetch="intent" style={{color: 'var(--promptos-purple)'}}>
                See the Authority page →
              </Link>
            </li>
          </MobileSection>

          <MobileSection
            label="Bundles"
            open={section === 'bundles'}
            onToggle={() => setSection(section === 'bundles' ? null : 'bundles')}
          >
            {BUNDLES.map((b) => (
              <li key={b.slug}>
                <Link to={`/bundles/${b.slug}`} onClick={onClose} prefetch="intent">
                  {b.name}, ${b.priceUSD}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/bundles" onClick={onClose} prefetch="intent" style={{color: 'var(--promptos-purple)'}}>
                Compare bundles →
              </Link>
            </li>
          </MobileSection>

          <MobileSection
            label="Guides"
            open={section === 'guides'}
            onToggle={() => setSection(section === 'guides' ? null : 'guides')}
          >
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link to={`/guides/${g.slug}`} onClick={onClose} prefetch="intent">
                  {g.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/guides" onClick={onClose} prefetch="intent" style={{color: 'var(--promptos-purple)'}}>
                See all guides →
              </Link>
            </li>
          </MobileSection>

          <li><Link to="/reviews" onClick={onClose} prefetch="intent">Reviews</Link></li>
          <li><Link to="/method" onClick={onClose} prefetch="intent">Method</Link></li>
          <li><Link to="/about" onClick={onClose} prefetch="intent">About</Link></li>
          <li><Link to="/contact" onClick={onClose} prefetch="intent">Contact</Link></li>
        </ul>

        <Link
          to={`/bundles/${MEGA_BUNDLE_SLUG}`}
          onClick={onClose}
          prefetch="intent"
          className="appnav-cta"
        >
          Everything Bundle, $798
        </Link>
      </aside>
    </>
  );
}

function MobileSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <li className={`mobile-section${open ? ' is-open' : ''}`}>
      <button type="button" onClick={onToggle} className="mobile-section-toggle">
        <span>{label}</span>
        <span className="caret" aria-hidden>
          <svg viewBox="0 0 12 12" width="14" height="14" fill="none">
            <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && <ul className="mobile-pack-list">{children}</ul>}
    </li>
  );
}

/** Preserved for PageLayout type compatibility. */
export function HeaderMenu(_props: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: 'desktop' | 'mobile';
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  return null;
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      type="button"
      aria-label="Search"
      className="appnav-icon-btn"
      onClick={() => open('search')}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function AccountLink({isLoggedIn}: {isLoggedIn: HeaderProps['isLoggedIn']}) {
  return (
    <Link to="/account" prefetch="intent" className="appnav-icon-btn" aria-label="Account">
      <Suspense
        fallback={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        }
      >
        <Await resolve={isLoggedIn}>
          {() => (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </Await>
      </Suspense>
    </Link>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBadgeFromCart />
      </Await>
    </Suspense>
  );
}

function CartBadgeFromCart() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const optimistic = useOptimisticCart(originalCart);
  return <CartBadge count={optimistic?.totalQuantity ?? 0} />;
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();
  return (
    <button
      type="button"
      className="appnav-icon-btn"
      aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: typeof window !== 'undefined' ? window.location.href : '',
        } as CartViewPayload);
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 7h14l-1.4 9.3a2 2 0 0 1-2 1.7H8.4a2 2 0 0 1-2-1.7L5 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {count > 0 && <span className="appnav-cart-count">{count}</span>}
    </button>
  );
}
