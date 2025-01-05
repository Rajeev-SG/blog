const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://blog-vr7a.vercel.app/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox-desktop',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'firefox-mobile',
      use: {
        ...devices['Pixel 5'],
        browserName: 'firefox',
      },
    },
    {
      name: 'chromium-tablet',
      use: { ...devices['iPad Pro 11'] },
    },
    {
      name: 'firefox-tablet',
      use: {
        ...devices['iPad Pro 11'],
        browserName: 'firefox',
      },
    },
  ],
});
