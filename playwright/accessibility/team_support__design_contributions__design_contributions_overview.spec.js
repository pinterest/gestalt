// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Design handoff Accessibility check', async ({ page }) => {
  await page.goto('/team_support/design_contributions/design_contributions_overview');
  await expectAccessiblePage({ page });
});
