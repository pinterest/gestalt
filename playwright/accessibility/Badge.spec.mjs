// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Badge Accessibility check', async ({ page }) => {
  await page.goto('/badge');
  await expectAccessiblePage({ page });
});
