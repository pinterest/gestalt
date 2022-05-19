// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Heading Accessibility check', async ({ page }) => {
  await page.goto('/heading');
  await expectAccessiblePage({
    page,
    rules: {
      'heading-order': { enabled: false },
    },
  });
});
