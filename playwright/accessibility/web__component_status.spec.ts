import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Web component status check', async ({ page }) => {
  await page.goto('/web/component_status');
// @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
