// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('IconButton Accessibility check', async ({ page }) => {
  await page.goto('/web/iconbutton');
  await expectAccessiblePage({ page });
});

test('Android IconButton Accessibility check', async ({ page }) => {
  await page.goto('/android/iconbutton');
  await expectAccessiblePage({ page });
});

test('iOS IconButton Accessibility check', async ({ page }) => {
  await page.goto('/ios/iconbutton');
  await expectAccessiblePage({ page });
});
