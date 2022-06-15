// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Link Accessibility check', async ({ page }) => {
  await page.goto('/link');
  await expectAccessiblePage({ page });
});
