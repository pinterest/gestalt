import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Development Accessibility check', async ({ page }) => {
  await page.goto('/get_started/developers/contributing/creating_and_updating_pages');
// @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
