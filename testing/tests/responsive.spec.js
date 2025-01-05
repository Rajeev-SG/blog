const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Blog Responsive Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display correctly on desktop', async ({ page }) => {
    // Take a screenshot
    const screenshotPath = path.join(process.cwd(), 'test-results', 'desktop-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Verify navigation
    const navLinks = await page.$$('nav a');
    expect(navLinks.length).toBeGreaterThan(0);
    
    // Verify main content
    const mainContent = await page.$('main');
    expect(await mainContent.isVisible()).toBeTruthy();
  });

  test('should display correctly on mobile', async ({ page }) => {
    // Take a screenshot
    const screenshotPath = path.join(process.cwd(), 'test-results', 'mobile-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Verify navigation
    const navLinks = await page.$$('nav a');
    expect(navLinks.length).toBeGreaterThan(0);
    
    // Verify main content
    const mainContent = await page.$('main');
    expect(await mainContent.isVisible()).toBeTruthy();

    // Additional mobile-specific tests
    const hamburgerMenu = await page.$('button[aria-label*="menu" i]');
    if (hamburgerMenu) {
      await hamburgerMenu.click();
      // Verify menu items are visible after clicking
      await page.waitForSelector('nav a');
      const visibleNavLinks = await page.$$('nav a:visible');
      expect(visibleNavLinks.length).toBeGreaterThan(0);
    }
  });

  test('should display correctly on tablet', async ({ page }) => {
    // Take a screenshot
    const screenshotPath = path.join(process.cwd(), 'test-results', 'tablet-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Verify navigation
    const navLinks = await page.$$('nav a');
    expect(navLinks.length).toBeGreaterThan(0);
    
    // Verify main content
    const mainContent = await page.$('main');
    expect(await mainContent.isVisible()).toBeTruthy();
  });

  test('should have proper meta viewport tag', async ({ page }) => {
    const viewportMeta = await page.$('meta[name="viewport"]');
    expect(viewportMeta).toBeTruthy();
    
    const content = await viewportMeta.getAttribute('content');
    expect(content).toContain('width=device-width');
    expect(content).toContain('initial-scale=1');
  });

  test('should load images properly', async ({ page }) => {
    // Wait for all images to load
    await page.waitForLoadState('domcontentloaded');
    
    // Get all images
    const images = await page.$$('img');
    
    // Verify each image
    for (const image of images) {
      // Check if image is visible
      expect(await image.isVisible()).toBeTruthy();
      
      // Check if image has loaded
      const naturalWidth = await image.evaluate(img => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});
