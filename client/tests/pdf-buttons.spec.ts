import { test, expect } from '@playwright/test';

test.describe('PDF Download Buttons', () => {
  test('should render centered PDF download buttons', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Wait for the page to load
    await page.waitForSelector('#cv-download', { timeout: 10000 });

    // Check that the PDF section exists
    await expect(page.locator('#cv-download')).toBeVisible();

    // Check that there are exactly 2 buttons (HTML and PDF)
    const buttons = page.locator('#cv-download button');
    await expect(buttons).toHaveCount(2);

    // Check that buttons have icons (i element)
    const buttonElements = await buttons.all();
    for (const button of buttonElements) {
      const icon = button.locator('i');
      await expect(icon).toBeVisible();
    }

    // Check buttons are centered by verifying their CSS properties
    const buttonClasses = await buttons.first().getAttribute('class');
    expect(buttonClasses).toContain('justify-center');
    expect(buttonClasses).toContain('items-center');

    // Check that buttons have no text content
    const buttonTexts = await buttons.all();
    for (const button of buttonTexts) {
      const text = await button.textContent();
      expect(text).toBe('');
    }
  });
});
