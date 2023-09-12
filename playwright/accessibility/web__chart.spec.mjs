// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Chart Accessibility check', async ({ page }) => {
  await page.goto('/web/chart');
  await expectAccessiblePage({ page });
});
