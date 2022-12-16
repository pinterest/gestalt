// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

// Skip since the tests times out
// eslint-disable-next-line jest/no-disabled-tests
test.skip('Year in review  Accessibility check', async ({ page }) => {
  await page.goto('/year_in_review_2022');
  await expectAccessiblePage({ page });
});
