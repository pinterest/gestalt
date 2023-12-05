// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Accordion Accessibility check', async ({ page }) => {
  await page.goto('/web/accordion');
  await expectAccessiblePage({
    page,
    rules: {
      // Interactive controls must not be nested
      'nested-interactive': { enabled: false },
    },
  });
});
