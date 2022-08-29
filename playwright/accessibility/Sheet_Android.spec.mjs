// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Android Sheet Page Accessibility check', async ({ page }) => {
  await page.goto('/android/sheet');
  await expectAccessiblePage({ page });
});
