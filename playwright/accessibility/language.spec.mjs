// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Content standards Language check', async ({ page }) => {
  await page.goto('/foundations/content_standards/language');
  await expectAccessiblePage({ page });
});
