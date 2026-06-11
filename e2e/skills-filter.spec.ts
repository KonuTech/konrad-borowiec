import { test, expect } from '@playwright/test';

// Role titles (<h4>) come from the data array (always English), so these
// assertions are locale-independent.
const roleTitles = (page: import('@playwright/test').Page) => page.locator('#about h4');

test('skills filter: GCP-BigQuery narrows the timeline to the Data Engineer role', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('#about').scrollIntoViewIfNeeded();

  // All 17 roles are present in the DOM before filtering.
  await expect(roleTitles(page)).toHaveCount(17);

  await page.locator('button[title="GCP - Big Query"]').first().click();

  await expect(roleTitles(page)).toHaveCount(1);
  await expect(roleTitles(page).first()).toHaveText('Data Engineer');
});

test('skills filter: SQL keeps several roles but not all, with highlighted tech mentions', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('#about').scrollIntoViewIfNeeded();

  const sqlIcon = page.locator('button[title="SQL"]').first();
  await sqlIcon.click();

  const count = await roleTitles(page).count();
  expect(count).toBeGreaterThan(1);
  expect(count).toBeLessThan(17);
  await expect(sqlIcon).toHaveAttribute('aria-pressed', 'true');

  // Highlighted technology mentions appear in the expanded description.
  await expect(page.locator('#about mark.tech-highlight').first()).toBeVisible();

  // Toggling the same icon off restores every role.
  await sqlIcon.click();
  await expect(roleTitles(page)).toHaveCount(17);
});

test('timeline tags: clicking a skill tag toggles the matching skill filter', async ({ page }) => {
  await page.goto('/');
  await page.locator('#about').scrollIntoViewIfNeeded();

  // The first role (Data Engineer) is expanded by default and carries a SQL tag.
  await page.locator('button[title="Filter by SQL"]').first().click();

  // The corresponding Skills icon reflects the active filter.
  await expect(page.locator('button[title="SQL"]').first()).toHaveAttribute('aria-pressed', 'true');
});
