// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android IconButton Accessibility check', async ({ page }) => {
  await page.goto('/android/iconbutton');
  await expectAccessiblePage({ page });
});
