// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Brand expression guidelines Accessibility check', async ({ page }) => {
  await page.goto('/foundations/brand_expression/guidelines');
  await expectAccessiblePage({ page });
});
