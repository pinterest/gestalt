// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android Checkbox Accessibility check', async ({ page }) => {
  await page.goto('/android/checkbox');
  await expectAccessiblePage({ page });
});
