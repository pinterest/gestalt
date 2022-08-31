// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Android Icon Accessibility check', async ({ page }) => {
  await page.goto('/Android/icon');
  await expectAccessiblePage({ page });
});
