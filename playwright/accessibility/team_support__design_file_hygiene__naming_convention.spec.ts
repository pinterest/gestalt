import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Naming convention Accessibility check', async ({ page }) => {
  await page.goto('/team_support/design_file_hygiene/naming_convention');
  // @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
