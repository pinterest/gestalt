// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Upsell Accessibility check', async ({ page }) => {
  await page.goto('/upsell');
  await expectAccessiblePage({ page });
});
