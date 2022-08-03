// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

// Skip since the tests times out
// eslint-disable-next-line jest/no-disabled-tests
test.skip("What's New Accessibility check", async ({ page }) => {
  await page.goto('/roadmap/whats_new');
  await expectAccessiblePage({ page });
});
