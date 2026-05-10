import { test, expect } from '@playwright/test';

test('i18n: switch to Polish and check key UI texts', async ({ page }) => {
  await page.goto('/');

  // Click the PL button in the horizontal language selector
  await page.locator('button[aria-label="Polski"]').click();

  // Wait for render
  await expect(page.locator('body')).toBeVisible();

  // Check hero CTA (Polish)
  await expect(page.locator('text=Zobacz moje projekty')).toBeVisible();

  // Check contact section title (Polish)
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('text=Skontaktuj się').first()).toBeVisible();

  // Check projects heading prefix + title
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('text=Moje').first()).toBeVisible();
  await expect(page.locator('text=Projekty').first()).toBeVisible();

  // Check books heading prefix + title
  await page.locator('#books').scrollIntoViewIfNeeded();
  await expect(page.locator('text=Moje').first()).toBeVisible();
  await expect(page.locator('text=Lista Czytania').first()).toBeVisible();
});
