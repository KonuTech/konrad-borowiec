import { test, expect } from '@playwright/test';

test('experience chart: a row drives the shared technology filter', async ({ page }) => {
  await page.goto('/');
  await page.locator('#about').scrollIntoViewIfNeeded();

  // Clicking a technology row toggles the same filter as its Skills icon.
  await page.locator('button[title^="SQL —"]').click();
  await expect(page.locator('button[title="SQL"]').first()).toHaveAttribute('aria-pressed', 'true');
});
