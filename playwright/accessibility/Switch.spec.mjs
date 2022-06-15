// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Switch Accessibility check', async ({ page }) => {
  await page.goto('/switch');
  await expectAccessiblePage({ page });
});
