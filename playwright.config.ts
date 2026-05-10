import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  webServer: {
    // Local development: run vite dev server. In CI, build and serve the production preview.
    command: process.env.CI ? 'npm run build && npm run preview -- --port 5173' : 'npm run dev',
    port: 5173,
    // Reuse existing server when not in CI to speed up local runs.
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
