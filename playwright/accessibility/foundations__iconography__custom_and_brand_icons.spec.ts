import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Custom brand icons check', async ({ page }) => {
  await page.goto('/foundations/iconography/custom_and_brand_icons');
  // @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
