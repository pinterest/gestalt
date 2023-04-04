// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Overview Android component page check', async ({ page }) => {
  await page.goto('/android/overview');
  await expectAccessiblePage({ page });
});
