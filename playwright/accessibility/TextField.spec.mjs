// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('TextField Accessibility check', async ({ page }) => {
  await page.goto('/textfield');
  await expectAccessiblePage({ page });
});
