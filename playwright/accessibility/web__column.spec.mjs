// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Column Accessibility check', async ({ page }) => {
  await page.goto('/web/column');
  await expectAccessiblePage({ page });
});
