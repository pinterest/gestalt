// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Design handoff Accessibility check', async ({ page }) => {
  await page.goto('/team_support/design_contributions/process_diagrams');
  await expectAccessiblePage({ page });
});
