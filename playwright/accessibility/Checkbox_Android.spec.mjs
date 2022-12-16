// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Checkbox Accessibility check', async ({ page }) => {
  await page.goto('/android/checkbox');
  await expectAccessiblePage({ page });
});
