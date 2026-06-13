/**
 * Provider-agnostic analytics wrapper.
 *
 * This is the ONLY module that knows about the underlying provider (Microsoft
 * Clarity). Everything else imports `trackEvent` / `trackPageview` so the
 * provider can be swapped (e.g. to PostHog) by editing this file alone.
 *
 * Disabled — a total no-op, no network calls — when:
 *   - running in dev/preview (`import.meta.env.DEV`), or
 *   - `VITE_CLARITY_ID` is empty/unset (the case in Playwright/CI), or
 *   - the visitor has Do-Not-Track enabled.
 *
 * Every public call is guarded and wrapped in try/catch so analytics can never
 * throw into the UI.
 */

export type EventProps = Record<string, string | number | boolean>;

let enabled = false;
let initialized = false;

function injectClarity(projectId: string): void {
  // Standard Microsoft Clarity loader, adapted to inject programmatically so it
  // stays out of the dev/preview/test bundles (it is never added to index.html).
  /* eslint-disable */
  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] =
      c[a] ||
      function (...args: unknown[]) {
        (c[a].q = c[a].q || []).push(args);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = 'https://www.clarity.ms/tag/' + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, 'clarity', 'script', projectId);
  /* eslint-enable */
}

/**
 * Reads UTM params and a forwarded `ref` (referrer hostname passed through the
 * GitHub Pages -> Azure redirect) and records the visit's traffic source.
 * Falls back to `direct` when nothing identifies the source.
 */
function captureSource(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || undefined;
    const utmMedium = params.get('utm_medium') || undefined;
    const utmCampaign = params.get('utm_campaign') || undefined;
    const referrerHost = params.get('ref') || undefined;

    const source = utmSource || referrerHost || 'direct';

    window.clarity?.('set', 'utm_source', utmSource ?? 'direct');
    if (utmMedium) window.clarity?.('set', 'utm_medium', utmMedium);
    if (utmCampaign) window.clarity?.('set', 'utm_campaign', utmCampaign);
    if (referrerHost) window.clarity?.('set', 'referrer_host', referrerHost);

    trackEvent('visit_source', {
      source,
      ...(utmMedium ? { medium: utmMedium } : {}),
      ...(utmCampaign ? { campaign: utmCampaign } : {}),
      ...(referrerHost ? { referrer_host: referrerHost } : {}),
    });
  } catch {
    /* analytics must never throw */
  }
}

export function initAnalytics(): void {
  if (initialized) return;
  initialized = true;

  const projectId = import.meta.env.VITE_CLARITY_ID;

  // No provider in dev/preview/test, when unconfigured, or under Do-Not-Track.
  if (import.meta.env.DEV || !projectId) return;
  if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') return;

  try {
    injectClarity(projectId);
    enabled = true;
    captureSource();
  } catch {
    enabled = false;
  }
}

/**
 * Clarity tracks pageviews automatically, so on this single-route SPA the
 * initial load is already counted. Kept for API completeness / provider swaps.
 */
export function trackPageview(props?: EventProps): void {
  trackEvent('pageview', props);
}

export function trackEvent(name: string, props?: EventProps): void {
  if (!enabled) return;
  try {
    if (props) {
      for (const [key, value] of Object.entries(props)) {
        window.clarity?.('set', `${name}_${key}`, String(value));
      }
    }
    window.clarity?.('event', name);
  } catch {
    /* analytics must never throw */
  }
}
