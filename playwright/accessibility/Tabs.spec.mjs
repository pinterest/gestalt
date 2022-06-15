// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Tabs Accessibility check', async ({ page }) => {
  await page.goto('/tabs');
  await expectAccessiblePage({
    page,
    rules: {
      'duplicate-id-aria': { enabled: false },
    },
  });
});
