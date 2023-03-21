// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('TapArea Accessibility check', async ({ page }) => {
  await page.goto('/web/taparea');
  await expectAccessiblePage({
    page,
    rules: {
      'nested-interactive': { enabled: false },
    },
  });
});
