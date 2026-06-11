import { test, expect } from '@playwright/test';

test('i18n: switch to Polish and check key UI texts', async ({ page }) => {
  await page.goto('/');

  // Click the PL button in the horizontal language selector.
  // The switcher is rendered in both the header and the mobile menu, so scope to the first.
  await page.locator('button[aria-label="Polski"]').first().click();

  // Wait for render
  await expect(page.locator('body')).toBeVisible();

  // Check hero CTA (Polish)
  await expect(page.locator('text=Zobacz moje projekty')).toBeVisible();

  // Check contact section title (Polish)
  await page.locator('#contact-info').scrollIntoViewIfNeeded();
  await expect(page.locator('text=Skontaktuj się').first()).toBeVisible();

  // Check projects heading prefix + title
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('text=Moje').first()).toBeVisible();
  await expect(page.locator('text=Projekty').first()).toBeVisible();

  // Check books heading prefix + title (Polish: "Moja Lista lektur")
  await page.locator('#books').scrollIntoViewIfNeeded();
  await expect(page.locator('#books').getByText('Moja', { exact: false }).first()).toBeVisible();
  await expect(page.locator('#books').getByText('Lista lektur').first()).toBeVisible();
});

test('i18n: switching to Arabic sets RTL document direction', async ({ page }) => {
  await page.goto('/');

  // Default (English) should be left-to-right
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

  // Switch to Arabic and verify the document flips to right-to-left
  await page.locator('button[aria-label="العربية"]').first().click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');

  // Switching back to English restores left-to-right
  await page.locator('button[aria-label="English"]').first().click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});
