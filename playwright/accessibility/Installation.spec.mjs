// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Installation Accessibility check', async ({ page }) => {
  await page.goto('/installation');
  await expectAccessiblePage({ page });
});
