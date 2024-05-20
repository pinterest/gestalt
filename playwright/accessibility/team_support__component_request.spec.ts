import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Component request Accessibility check', async ({ page }) => {
  await page.goto('/team_support/component_request');
// @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
