// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Organizing layout Accessibility check', async ({ page }) => {
  await page.goto('/team_support/design_file_hygiene/organizing_layout');
  await expectAccessiblePage({ page });
});
