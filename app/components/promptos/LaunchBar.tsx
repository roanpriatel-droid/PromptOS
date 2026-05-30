/**
 * v3.8a Phase 3A — launch week top bar.
 *
 * Site-wide thin bar above the main header. Click "LAUNCH" copies the
 * code to clipboard; a tiny "Copied!" pill appears for 1.6s. Dismissable
 * via × on the right. Cookie-gated: once dismissed, hides for 24 hours.
 */
import {useEffect, useState} from 'react';

const STORAGE_KEY = 'promptos-launch-bar-dismissed-v1';
const DISMISS_HOURS = 24;
const CODE = 'LAUNCH';

function readDismissed(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_HOURS * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function LaunchBar() {
  const [dismissed, setDismissed] = useState(true); // SSR-safe: start hidden, reveal on client
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDismissed(readDismissed());
  }, []);

  useEffect(() => {
    if (!dismissed) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') dismiss();
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [dismissed]);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // localStorage blocked — banner stays dismissed for this session only
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable — fall back to manual select via selection API
      const range = document.createRange();
      const sel = window.getSelection();
      const node = document.getElementById('launch-bar-code');
      if (node && sel) {
        range.selectNode(node);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  if (dismissed) return null;

  return (
    <div
      className="launch-bar"
      role="region"
      aria-label="Launch week promotion"
      style={{
        position: 'relative',
        background: '#6B46C1',
        color: '#FAF8F5',
        textAlign: 'center',
        padding: '10px 56px',
        fontSize: 14,
        lineHeight: 1.45,
        letterSpacing: '0.01em',
      }}
    >
      <span>
        Launch week: 15% off all bundles with code{' '}
        <button
          id="launch-bar-code"
          type="button"
          onClick={copyCode}
          aria-label="Copy code LAUNCH to clipboard"
          style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.15)',
            color: 'inherit',
            border: '1px solid rgba(255,255,255,0.30)',
            padding: '2px 10px',
            borderRadius: 999,
            font: 'inherit',
            fontWeight: 700,
            letterSpacing: '0.08em',
            cursor: 'pointer',
            margin: '0 2px',
          }}
        >
          {CODE}
        </button>
        . Through June 3.
      </span>
      {copied && (
        <span
          role="status"
          aria-live="polite"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, calc(100% + 6px))',
            background: '#FAF8F5',
            color: '#0F0A1F',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 999,
            boxShadow: '0 4px 12px -2px rgba(15,10,31,0.18)',
            pointerEvents: 'none',
          }}
        >
          Copied!
        </span>
      )}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss launch week banner"
        style={{
          position: 'absolute',
          top: '50%',
          right: 16,
          transform: 'translateY(-50%)',
          width: 28,
          height: 28,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          color: '#FAF8F5',
          border: 'none',
          borderRadius: 999,
          cursor: 'pointer',
          opacity: 0.85,
        }}
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden>
          <path d="m4 4 8 8M12 4 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
