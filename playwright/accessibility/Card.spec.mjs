// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Card Accessibility check', async ({ page }) => {
  await page.goto('/card');
  await expectAccessiblePage({ page });
});
