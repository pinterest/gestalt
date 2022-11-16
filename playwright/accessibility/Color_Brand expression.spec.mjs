// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Brand expression color check', async ({ page }) => {
  await page.goto('/foundations/brand_expression/color');
  await expectAccessiblePage({ page });
});
