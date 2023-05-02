// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us TagData check', async ({ page }) => {
  await page.goto('/tagdata');
  await expectAccessiblePage({ page });
});
