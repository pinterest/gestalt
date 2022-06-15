// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Label Accessibility check', async ({ page }) => {
  await page.goto('/label');
  await expectAccessiblePage({ page });
});
