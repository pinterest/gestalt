// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Contributions Accessibility check', async ({ page }) => {
  await page.goto('/team_support/contributions');
  await expectAccessiblePage({ page });
});
