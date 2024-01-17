// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Year in review  Accessibility check', async ({ page }) => {
  await page.goto('/year_in_review_2023');
  await expectAccessiblePage({
    page,
    rules: {
      /* The svg decor shares IDs, but won't affect accessibility */
      'duplicate-id': { enabled: false },
    },
  });
});
