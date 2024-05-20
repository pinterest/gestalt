// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Web IconButton Accessibility check', async ({ page }) => {
  await page.goto('/web/iconbuttonlink');
  await expectAccessiblePage({ page });
});
