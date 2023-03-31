// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us Accessibility check', async ({ page }) => {
  await page.goto('/get_started/about_us');
  await expectAccessiblePage({ page });
});
