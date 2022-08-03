// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Popover Accessibility check', async ({ page }) => {
  await page.goto('/web/popover');
  await expectAccessiblePage({
    page,
    rules: {
      region: { enabled: false },
    },
  });
});
