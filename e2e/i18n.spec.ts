import { test, expect } from '@playwright/test';

test('i18n: switch to Polish and check key UI texts', async ({ page }) => {
  await page.goto('/');

  // Open language dropdown and choose Polish
  const langButton = page.locator('button[aria-label="Select language"]');
  await langButton.click();
  await page.locator('button', { hasText: 'Polski' }).click();

  // Wait for render
  await expect(page.locator('body')).toBeVisible();

  // Check hero CTA (Polish)
  await expect(page.locator('text=Zobacz moje projekty')).toBeVisible();

  // Check contact label (Polish)
  await expect(page.locator('text=Twoje Imię i Nazwisko')).toBeVisible();

  // Check projects heading prefix + title
  await expect(page.locator('text=Moje')).toBeVisible();
  await expect(page.locator('text=Projekty')).toBeVisible();
});
