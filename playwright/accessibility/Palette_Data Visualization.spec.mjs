// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Data viz palette check', async ({ page }) => {
  await page.goto('/foundations/data_visualization/palette');
  await expectAccessiblePage({ page });
});
