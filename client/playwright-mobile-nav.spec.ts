import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation Layout', () => {
  test('check mobile nav layout on small screen', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to the app
    await page.goto('http://localhost:5173');

    // Wait for mobile menu to appear
    await page.waitForSelector('.md:hidden', { timeout: 5000 });

    // Get the mobile menu element
    const mobileMenu = page.locator('.md:hidden');

    // Check the layout
    const boundingBox = await mobileMenu.boundingBox();
    console.log('Mobile menu bounding box:', boundingBox);

    // Get the text content of the nav
    const navText = await mobileMenu.textContent();
    console.log('Nav text:', navText);

    // Check for social icons
    const socialIcons = page.locator('i.fab, i.fas');
    const socialCount = await socialIcons.count();
    console.log('Social icons count:', socialCount);

    // Get positions of social icons
    const socialElements = page.locator('i.fab, i.fas');
    const positions = [];
    for (const element of await socialElements.all()) {
      const box = await element.boundingBox();
      if (box) {
        positions.push({ x: box.x, y: box.y, element: await element.textContent() });
      }
    }
    console.log('Social icon positions:', positions);

    // Check for language toggle
    const langToggle = page.locator('.language-switcher');
    const langToggleBox = await langToggle.boundingBox();
    console.log('Language toggle position:', langToggleBox);

    // Check for dark mode toggle
    const darkToggle = page.locator('.dark-mode-toggle');
    const darkToggleBox = await darkToggle.boundingBox();
    console.log('Dark mode toggle position:', darkToggleBox);

    // Take screenshot for debugging
    await page.screenshot({
      path: '/mnt/c/Users/borow/VSC/projects/konrad-borowiec/client/mobile-nav-screenshot.png',
    });
    console.log('Screenshot saved');
  });
});
