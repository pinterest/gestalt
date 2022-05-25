// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us ProgressBar check', async ({ page }) => {
  await page.goto('/progressbar');
  await expectAccessiblePage({ page });
});
