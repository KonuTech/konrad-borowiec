import { test, expect } from '@playwright/test';

test('home page serves and body is visible', async ({ page }) => {
  const response = await page.goto('/');
  // Ensure server responded
  if (response) {
    expect(response.ok()).toBeTruthy();
  }
  // Basic render check: body exists and is visible
  await expect(page.locator('body')).toBeVisible();
});
