// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Status Accessibility check', async ({ page }) => {
  await page.goto('/status');
  await expectAccessiblePage({ page });
});
