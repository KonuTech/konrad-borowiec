import { test, expect } from '@playwright/test';

test('interests gallery auto-rotates the photo over time', async ({ page }) => {
  await page.goto('/');
  await page.locator('#interests').scrollIntoViewIfNeeded();

  const mainImage = page.locator(
    '#interests img[alt="Motorcycle road trip"], #interests img[alt="Cycling adventure"]',
  );
  const before = await mainImage.first().getAttribute('src');

  // The gallery rotates every 5s; after >5s the displayed photo must have changed.
  await page.waitForTimeout(6500);

  const after = await mainImage.first().getAttribute('src');
  expect(after).not.toBe(before);
});
