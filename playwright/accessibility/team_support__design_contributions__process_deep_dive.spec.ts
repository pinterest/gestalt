import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Design handoff Accessibility check', async ({ page }) => {
  await page.goto('/team_support/design_contributions/process_deep_dive');
  // @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
