import { defineConfig, devices } from '@playwright/test';

const reporter: 'github' | 'list' = process.env.CI ? 'github' : 'list';

export default defineConfig({
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixels: 50,
      maxDiffPixelRatio: 0.01,
      threshold: 0.7,
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
    deviceScaleFactor: 2,
    trace: 'on-first-retry',
  },
});
