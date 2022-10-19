// @flow strict
const { devices } = require('@playwright/test');

const reporter /*: string */ = process.env.CI ? 'github' : 'list';

const config = {
  deviceScaleFactor: 2,
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixels: 50,
      maxDiffPixelRatio: 0.01,
    },
  },
  forbidOnly: !!process.env.CI,
  outputDir: './test-results',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  reporter,
  retries: 3,
  timeout: 120000,
  webServer: {
    command: 'yarn docs',
    port: 3000,
    cwd: __dirname,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    trace: 'on-first-retry',
  },
};

module.exports = config;
