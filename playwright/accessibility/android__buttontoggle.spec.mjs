// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Android ButtonToggle Accessibility check', async ({ page }) => {
  await page.goto('/android/buttontoggle');
  await expectAccessiblePage({ page });
});
