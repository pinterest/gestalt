// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Tooltip Accessibility check', async ({ page }) => {
  await page.goto('/web/tooltip');
  await expectAccessiblePage({ page });
});
