import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Structure and behavior Accessibility check', async ({ page }) => {
  await page.goto('/foundations/forms/structure_and_behavior');
// @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
