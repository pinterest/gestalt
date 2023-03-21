// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Android Tabs Accessibility check', async ({ page }) => {
  await page.goto('/android/tabs');
  await expectAccessiblePage({ page });
});
