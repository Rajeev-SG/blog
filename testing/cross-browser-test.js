const { chromium, firefox, webkit } = require('playwright');
const path = require('path');
const fs = require('fs');

const URL = 'https://blog-vr7a.vercel.app/';

const deviceSizes = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 }
};

const browsers = [
  { name: 'chromium', launcher: chromium },
  { name: 'firefox', launcher: firefox },
  { name: 'webkit', launcher: webkit }
];

async function createDirectoryIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function testWebsite() {
  console.log('Starting cross-browser testing...');

  for (const browser of browsers) {
    console.log(`Testing in ${browser.name}...`);
    try {
      const browserInstance = await browser.launcher.launch({
        args: browser.name === 'webkit' ? ['--disable-background-timer-throttling'] : []
      });

      for (const [deviceType, viewport] of Object.entries(deviceSizes)) {
        console.log(`Testing ${deviceType} viewport...`);
        
        // Create browser context with viewport - special handling for webkit
        const contextOptions = {
          viewport: viewport,
          forcedColors: browser.name === 'webkit' ? 'none' : undefined
        };

        const context = await browserInstance.newContext(contextOptions);

        const page = await context.newPage();
        
        const screenshotDir = path.join(__dirname, browser.name, deviceType);
        await createDirectoryIfNotExists(screenshotDir);
        
        try {
          await page.goto(URL, { 
            waitUntil: 'networkidle',
            timeout: 30000 
          });
          console.log(`Loaded ${URL} successfully`);
          
          await page.waitForTimeout(2000);
          
          await page.screenshot({
            path: path.join(screenshotDir, 'full-page.png'),
            fullPage: true,
            timeout: 30000
          });
          
          console.log(`Screenshot saved for ${browser.name} - ${deviceType}`);
        } catch (error) {
          console.error(`Error capturing screenshot for ${browser.name} on ${deviceType}:`, error);
        }
        
        await context.close();
      }
      
      await browserInstance.close();
    } catch (error) {
      console.error(`Error initializing ${browser.name}:`, error);
    }
  }
  
  console.log('Testing completed!');
}

testWebsite().catch(console.error);