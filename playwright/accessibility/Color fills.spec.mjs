// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Brand expression color fills Accessibility check', async ({ page }) => {
  await page.goto('/foundations/brand_expression/color_fills');
  await expectAccessiblePage({ page });
});
