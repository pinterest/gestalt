// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Be a Gestalt avocate Accessibility check', async ({ page }) => {
  await page.goto('/team_support/be_a_gestalt_advocate');
  await expectAccessiblePage({ page });
});
