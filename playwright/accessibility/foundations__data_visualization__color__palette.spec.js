// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Data Viz Color Palette Accessibility check', async ({ page }) => {
  await page.goto('/foundations/data_visualization/color/palette');
  await expectAccessiblePage({ page });
});
