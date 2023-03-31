// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Get help Accessibility check', async ({ page }) => {
  await page.goto('/team_support/get_help');
  await expectAccessiblePage({ page });
});
