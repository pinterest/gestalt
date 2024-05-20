import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

// Skip since the tests times out
// eslint-disable-next-line jest/no-disabled-tests
test.skip("What's New Accessibility check", async ({ page }) => {
  await page.goto('/whats_new');
// @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
