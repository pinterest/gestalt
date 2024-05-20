// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Available Components Accessibility check', async ({ page }) => {
  await page.goto('/foundations/forms/available_components');
  await expectAccessiblePage({ page });
});
