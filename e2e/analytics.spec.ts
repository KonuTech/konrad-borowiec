import { test, expect } from '@playwright/test';

// Analytics is gated: with VITE_CLARITY_ID unset (the case in dev/CI) the
// provider must never load and trackEvent must be a safe no-op, so the app
// boots normally and no Clarity network call is made.
test('analytics stays disabled and does not break the app when unconfigured', async ({ page }) => {
  let clarityRequested = false;
  page.on('request', (req) => {
    if (req.url().includes('clarity.ms')) clarityRequested = true;
  });

  const response = await page.goto('/');
  if (response) {
    expect(response.ok()).toBeTruthy();
  }

  // App renders.
  await expect(page.locator('body')).toBeVisible();

  // Provider was never injected.
  const clarityType = await page.evaluate(() => typeof (window as any).clarity);
  expect(clarityType).toBe('undefined');
  expect(clarityRequested).toBe(false);
});
