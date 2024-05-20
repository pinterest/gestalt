// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android Toast Accessibility check', async ({ page }) => {
  await page.goto('/android/toast');
  await expectAccessiblePage({ page });
});
