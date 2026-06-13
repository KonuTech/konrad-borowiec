/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Microsoft Clarity project id. When empty/undefined, analytics is disabled. */
  readonly VITE_CLARITY_ID?: string;
  /** Short git SHA injected at build time (see vite.config.ts). */
  readonly VITE_BUILD_ID?: string;
  readonly VITE_COMMIT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Microsoft Clarity command-queue function. Present on `window` only after the
 * Clarity loader has been injected by `initAnalytics()` — hence optional.
 * See https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
 */
type ClarityCommand = 'set' | 'event' | 'identify' | 'consent' | 'upgrade';

interface Window {
  clarity?: (command: ClarityCommand, ...args: unknown[]) => void;
}
