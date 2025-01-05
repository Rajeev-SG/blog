const { chromium, firefox } = require('playwright');
const path = require('path');
const fs = require('fs');

// Define viewport sizes for testing
const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 }
];

// Define browsers to test
const browsers = [
  { name: 'chromium', launcher: chromium },
  { name: 'firefox', launcher: firefox }
];

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

async function runTest(browser, browserName) {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    for (const viewport of viewports) {
      console.log(`Testing ${browserName} on ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
      
      // Set viewport size
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      });

      // Navigate to the blog
      await page.goto('https://blog-vr7a.vercel.app/');
      await page.waitForLoadState('domcontentloaded');
      
      // Take screenshot
      const screenshotPath = path.join(screenshotsDir, `${browserName}-${viewport.name}-full-page.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });
      console.log(`Screenshot saved: ${screenshotPath}`);

      // Test navigation and interactivity
      const navLinks = await page.$$('nav a');
      console.log(`Found ${navLinks.length} navigation links`);

      // Test responsive layout
      const mainContent = await page.$('main');
      if (mainContent) {
        const isVisible = await mainContent.isVisible();
        console.log(`Main content visibility: ${isVisible}`);
      }
    }
  } finally {
    await context.close();
  }
}

(async () => {
  try {
    for (const { name, launcher } of browsers) {
      console.log(`Starting tests for ${name}`);
      const browser = await launcher.launch();
      
      try {
        await runTest(browser, name);
      } finally {
        await browser.close();
      }
    }
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
})();
