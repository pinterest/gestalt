// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us SheetMobile check', async ({ page }) => {
  await page.goto('/sheetmobile');
  await expectAccessiblePage({ page });
});
