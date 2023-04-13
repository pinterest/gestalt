// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Android TextArea Accessibility check', async ({ page }) => {
  await page.goto('/android/textarea');
  await expectAccessiblePage({ page });
});
