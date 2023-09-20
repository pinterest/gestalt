// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Android ActionList Accessibility check', async ({ page }) => {
  await page.goto('/android/actionlist');
  await expectAccessiblePage({ page });
});
