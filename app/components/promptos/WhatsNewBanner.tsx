import {useEffect, useState} from 'react';
import {Link} from 'react-router';

const STORAGE_KEY = 'promptos-whats-new-banner-dismissed-v1';

/**
 * Top-of-site dismissible "What's new" banner. Sits above the main nav.
 * Once dismissed, stays dismissed for that browser (localStorage).
 */
export function WhatsNewBanner() {
  const [dismissed, setDismissed] = useState(true); // start hidden until SSR/CSR rehydrates

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // localStorage blocked — banner stays dismissed for this session only
    }
  };

  useEffect(() => {
    if (dismissed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className="whats-new-banner" role="region" aria-label="What's new at Promptos">
      <Link to="/authority" prefetch="intent" className="whats-new-text">
        <span className="whats-new-tag">New</span>
        <span className="whats-new-message">
          Three Authority products on personal branding, daily content, and turning your audience into a product.
        </span>
        <span className="whats-new-cta">Browse →</span>
      </Link>
      <button
        type="button"
        className="whats-new-close"
        aria-label="Dismiss banner"
        onClick={dismiss}
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden>
          <path d="m4 4 8 8M12 4 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
