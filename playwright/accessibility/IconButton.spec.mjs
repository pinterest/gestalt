// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('IconButton Accessibility check', async ({ page }) => {
  await page.goto('/iconbutton');
  await expectAccessiblePage({ page });
});
