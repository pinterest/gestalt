// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Training Accessibility check', async ({ page }) => {
  await page.goto('/team_support/training');
  await expectAccessiblePage({ page });
});
