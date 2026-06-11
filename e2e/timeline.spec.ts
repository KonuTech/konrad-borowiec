import { test, expect } from '@playwright/test';

test('timeline: multiple entries can be expanded independently', async ({ page }) => {
  await page.goto('/');
  await page.locator('#about').scrollIntoViewIfNeeded();

  const descriptions = page.locator('#about [class*="timeline-description-id-"]');

  // The first entry is expanded by default.
  await expect(descriptions).toHaveCount(1);

  // Opening a second entry keeps the first one open.
  await page.locator('#about h4').nth(1).click();
  await expect(descriptions).toHaveCount(2);

  // Collapsing the first entry leaves the second one open.
  await page.locator('#about h4').nth(0).click();
  await expect(descriptions).toHaveCount(1);
});
