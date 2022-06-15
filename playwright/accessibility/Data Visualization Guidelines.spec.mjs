// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Data Viz Color Usage Accessibility check', async ({ page }) => {
  await page.goto('/data_visualization_guidelines');
  await expectAccessiblePage({ page });
});
