// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Table Accessibility check', async ({ page }) => {
  await page.goto('/web/table');
  await expectAccessiblePage({ page });
});
