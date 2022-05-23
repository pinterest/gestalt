// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Module Accessibility check', async ({ page }) => {
  await page.goto('/module');
  await expectAccessiblePage({
    page,
    rules: {
      // Interactive controls must not be nested
      'nested-interactive': { enabled: false },
    },
  });
});
