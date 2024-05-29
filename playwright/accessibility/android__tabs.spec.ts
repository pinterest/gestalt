import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android Tabs Accessibility check', async ({ page }) => {
  await page.goto('/android/tabs');
  // @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
