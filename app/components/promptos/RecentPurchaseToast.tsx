import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router';
import {
  getRandomRecentPurchase,
  getRandomTimestamp,
  PRODUCT_LINK,
  type RecentPurchase,
} from '~/lib/recent_purchases';

/**
 * Live recent-purchase notification toast.
 *
 * Bottom-left of every page (bottom-center on mobile). First toast 12–18s
 * after page load, then a new one every 30–50s. Each visible 6–8s, then
 * auto-dismisses. Manual dismiss applies a 90s cooldown before the next one.
 *
 * Skipped on /cart, /checkout, /contact, /account. Respects
 * prefers-reduced-motion. Dismissible via Esc when focused.
 */

const SKIPPED_PREFIXES = ['/cart', '/checkout', '/contact', '/account'];

type ToastState = {
  purchase: RecentPurchase;
  timestamp: string;
};

const AVATAR_PALETTE = ['#6B46C1', '#EC4899', '#C2410C', '#15803D', '#CA8A04', '#475569', '#3B1F6B'];
function colorFor(name: string): string {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xfffffff;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}

export function RecentPurchaseToast() {
  const {pathname} = useLocation();
  const [toast, setToast] = useState<ToastState | null>(null);
  const [visible, setVisible] = useState(false);
  const historyRef = useRef<Set<number>>(new Set());
  const cooldownRef = useRef<number>(0);

  const skipped = SKIPPED_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (skipped) {
      setToast(null);
      setVisible(false);
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let cancelled = false;
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const showNext = () => {
      if (cancelled) return;
      if (Date.now() < cooldownRef.current) {
        nextTimer = setTimeout(showNext, cooldownRef.current - Date.now() + 500);
        return;
      }
      const {idx, ...purchase} = getRandomRecentPurchase(historyRef.current);
      historyRef.current.add(idx);
      if (historyRef.current.size > 8) {
        const first = historyRef.current.values().next().value;
        if (first !== undefined) historyRef.current.delete(first);
      }
      setToast({purchase, timestamp: getRandomTimestamp()});
      requestAnimationFrame(() => setVisible(true));

      const visibleMs = prefersReduced ? 5000 : 6000 + Math.random() * 2000;
      hideTimer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setToast(null), 350);
        const nextMs = prefersReduced ? 40000 : 30000 + Math.random() * 20000;
        nextTimer = setTimeout(showNext, nextMs);
      }, visibleMs);
    };

    const initialMs = 12000 + Math.random() * 6000;
    nextTimer = setTimeout(showNext, initialMs);

    return () => {
      cancelled = true;
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [skipped, pathname]);

  useEffect(() => {
    if (!visible || !toast) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVisible(false);
        cooldownRef.current = Date.now() + 90_000;
        setTimeout(() => setToast(null), 350);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, toast]);

  if (skipped || !toast) return null;

  const {purchase, timestamp} = toast;
  const initials = purchase.firstName.slice(0, 2).toUpperCase();
  return (
    <div
      className={`recent-toast${visible ? ' is-visible' : ''}`}
      role="status"
      aria-live="polite"
    >
      <Link
        to={PRODUCT_LINK(purchase.productSlug, purchase.productType)}
        prefetch="intent"
        className="recent-toast-link"
      >
        <div
          className="recent-toast-av"
          style={{background: colorFor(purchase.firstName)}}
          aria-hidden
        >
          {initials}
        </div>
        <div className="recent-toast-body">
          <p className="recent-toast-line1">
            <strong>{purchase.firstName}</strong> from {purchase.city}
          </p>
          <p className="recent-toast-line2">
            Bought <span className="recent-toast-product">{purchase.productName}</span>
          </p>
          <p className="recent-toast-meta">
            <span className="recent-toast-time">{timestamp}</span>
            <span className="recent-toast-badge">Verified buyer</span>
          </p>
        </div>
      </Link>
      <button
        type="button"
        className="recent-toast-close"
        aria-label="Dismiss notification"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setVisible(false);
          cooldownRef.current = Date.now() + 90_000;
          setTimeout(() => setToast(null), 350);
        }}
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden>
          <path d="m4 4 8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
