// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Android TextField Accessibility check', async ({ page }) => {
  await page.goto('/android/textfield');
  await expectAccessiblePage({ page });
});
