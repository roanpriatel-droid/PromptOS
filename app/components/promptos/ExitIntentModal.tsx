import {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router';

const STORAGE_KEY = 'promptos-exit-intent-dismissed-v1';
const SKIPPED_PREFIXES = ['/cart', '/checkout'];

/**
 * Exit-intent modal. Fires when the cursor moves toward the top of the
 * viewport (a rough exit signal). One-time per browser (localStorage).
 * Mobile is skipped entirely (no reliable exit-intent there).
 */
export function ExitIntentModal() {
  const {pathname} = useLocation();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dismissedRef = useRef(true);

  const skipped = SKIPPED_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (typeof window === 'undefined' || skipped) return;
    // Skip on mobile (no reliable mouseleave for exit signal)
    if (window.matchMedia('(max-width: 900px)').matches) return;
    try {
      dismissedRef.current = localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      dismissedRef.current = false;
    }
    if (dismissedRef.current) return;

    const onLeave = (e: MouseEvent) => {
      if (dismissedRef.current) return;
      if (e.clientY <= 0 && e.relatedTarget == null) {
        dismissedRef.current = true;
        setOpen(true);
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
      }
    };
    document.addEventListener('mouseout', onLeave);
    return () => document.removeEventListener('mouseout', onLeave);
  }, [skipped, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (skipped || !open) return null;

  return (
    <div
      className="exit-intent-overlay"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div
        className="exit-intent-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="exit-intent-close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        {submitted ? (
          <div className="exit-intent-success">
            <div className="exit-intent-success-ring" aria-hidden>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                <path d="m5 12 5 5L20 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 id="exit-intent-title">Your code is on the way.</h2>
            <p>Check your inbox. Code is good for 24 hours. No spam, ever.</p>
          </div>
        ) : (
          <>
            <span className="exit-intent-eyebrow">Before you go</span>
            <h2 id="exit-intent-title">
              Take 10% off your first order.
            </h2>
            <p>
              We'll email you a code that works on any pack, playbook, or bundle.
              Valid 24 hours. No followups.
            </p>
            <form
              className="exit-intent-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input type="email" placeholder="you@work.com" aria-label="Email address" required />
              <button type="submit">Get my code</button>
            </form>
            <p className="exit-intent-fine">One-time discount. Stacks with bundles. No reason not to.</p>
          </>
        )}
      </div>
    </div>
  );
}
