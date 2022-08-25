// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Android Icon Accessibility check', async ({ page }) => {
  await page.goto('/android/icon');
  await expectAccessiblePage({ page });
});
