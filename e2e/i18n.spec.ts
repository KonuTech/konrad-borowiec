import { test, expect } from '@playwright/test';

test('i18n: switch to Polish and check key UI texts', async ({ page }) => {
  // Set i18next language preference in localStorage before loading
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('i18nextLng', 'pl'));
  await page.reload();

  // Wait for page render
  await expect(page.locator('body')).toBeVisible();

  // Check hero CTA (Polish)
  await expect(page.locator('text=Zobacz moje projekty')).toBeVisible();

  // Check contact label (Polish)
  await expect(page.locator('text=Imię i nazwisko')).toBeVisible();

  // Check projects heading prefix + title
  await expect(page.locator('text=Moje')).toBeVisible();
  await expect(page.locator('text=Projekty')).toBeVisible();
});
