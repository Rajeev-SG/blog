# Blog Testing Suite

This testing suite provides comprehensive cross-browser and responsive testing for the blog website using Playwright. It includes both standalone scripts and Playwright Test Runner implementations.

## Features

- Cross-browser testing (Chrome and Firefox)
- Responsive design testing across multiple viewport sizes:
  - Mobile (375x667)
  - Tablet (768x1024)
  - Desktop (1280x800)
- Automated screenshot capture
- HTML test reports
- Navigation and content verification
- Image loading tests
- Responsive layout validation

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install browser drivers:
```bash
npx playwright install chromium firefox
```

## Test Scripts

### Playwright Test Runner (`/tests` directory)

The test runner provides structured tests with reporting and parallel execution.

Available commands:
- `npm test` - Run all tests across all browsers and devices
- `npm run test:chrome` - Run tests only in Chrome
- `npm run test:firefox` - Run tests only in Firefox

Test configurations:
- Chromium Desktop
- Firefox Desktop
- Chromium Mobile (Pixel 5)
- Firefox Mobile (Pixel 5)
- Chromium Tablet (iPad Pro 11)
- Firefox Tablet (iPad Pro 11)

### Standalone Responsive Testing Script

`blog-responsive-test.js` provides detailed responsive testing with screenshot captures.

Run with:
```bash
npm run test:responsive
```

Features:
- Tests both Chrome and Firefox
- Captures full-page screenshots for each viewport size
- Verifies navigation elements and content visibility
- Screenshots saved in `screenshots` directory

### Run All Tests

To run both the standalone script and test runner:
```bash
npm run test:all
```

## Test Results

- Screenshots: Located in `screenshots` directory
- Test Reports: Available in `playwright-report` directory after running tests
- Traces: Generated for failed tests in `test-results` directory

## Directory Structure

```
testing/
├── tests/                    # Playwright test runner tests
│   └── responsive.spec.js    # Responsive design tests
├── screenshots/              # Screenshot output directory
├── playwright-report/        # HTML test reports
├── test-results/            # Test artifacts and traces
├── blog-responsive-test.js   # Standalone test script
├── playwright.config.js      # Playwright configuration
└── package.json             # Project configuration and scripts
```

## Debugging

- HTML report: Open `playwright-report/index.html` after test runs
- Traces: Available for failed tests in `test-results` directory
- Screenshots: Check `screenshots` directory for visual comparison

## CI/CD Integration

The test suite is configured for CI environments with:
- Parallel test execution
- Retry logic for flaky tests
- HTML reporting
- Screenshot capture on failure

## Troubleshooting

If tests fail:
1. Check the HTML report for detailed error information
2. Review screenshots in the `screenshots` directory
3. Check browser console logs in the test report
4. Verify network connectivity to the blog URL
5. Ensure all browser drivers are properly installed
