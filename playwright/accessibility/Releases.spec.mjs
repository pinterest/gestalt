// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Releases Accessibility check', async ({ page }) => {
  await page.goto('/get_started/developers/releases');
  await expectAccessiblePage({
    page,
    rules: {
      'color-contrast': { enabled: false },
    },
  });
});
