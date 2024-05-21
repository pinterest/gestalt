import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Content standards Language check', async ({ page }) => {
  await page.goto('/foundations/content_standards/Inclusive_Language');
  // @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
