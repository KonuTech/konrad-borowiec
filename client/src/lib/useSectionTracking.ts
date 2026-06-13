import { useEffect, useRef } from 'react';
import { trackEvent } from './analytics';

/**
 * Tracks section engagement by observing the `activeSection` value that
 * `Header`'s IntersectionObserver already maintains (so we don't add a second
 * observer). Emits:
 *   - `section_viewed` once per section per page load, and
 *   - `section_time` with seconds spent, when leaving a section or when the
 *     tab is hidden / the page unloads.
 */
export function useSectionTracking(activeSection: string): void {
  const seenRef = useRef<Set<string>>(new Set());
  const currentRef = useRef<string>(activeSection);
  const enterTimeRef = useRef<number>(Date.now());

  const flush = () => {
    const section = currentRef.current;
    if (!section) return;
    const seconds = Math.round((Date.now() - enterTimeRef.current) / 1000);
    if (seconds > 0) {
      trackEvent('section_time', { section, seconds });
    }
    enterTimeRef.current = Date.now();
  };

  useEffect(() => {
    if (!activeSection || activeSection === currentRef.current) {
      // first render: count the initial section as viewed
      if (activeSection && !seenRef.current.has(activeSection)) {
        seenRef.current.add(activeSection);
        trackEvent('section_viewed', { section: activeSection });
      }
      return;
    }

    // Leaving the previous section -> record dwell time, then enter the new one.
    flush();
    currentRef.current = activeSection;

    if (!seenRef.current.has(activeSection)) {
      seenRef.current.add(activeSection);
      trackEvent('section_viewed', { section: activeSection });
    }
  }, [activeSection]);

  // Flush the current section's dwell time when the tab is backgrounded or the
  // page is being unloaded (visibilitychange is more reliable on mobile).
  useEffect(() => {
    const onHidden = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('pagehide', flush);
    return () => {
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
}
