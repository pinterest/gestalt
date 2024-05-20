import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Data Viz Color Palette Accessibility check', async ({ page }) => {
  await page.goto('/foundations/data_visualization/charts_and_graphs/bar_graphs');
  await expectAccessiblePage({ page });
});
