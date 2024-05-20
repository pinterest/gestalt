import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Color examples check', async ({ page }) => {
  await page.goto('/foundations/color/examples');
  await expectAccessiblePage({ page });
});
