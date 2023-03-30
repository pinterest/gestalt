// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Upsell Accessibility check', async ({ page }) => {
  await page.goto('/web/upsell');
  await expectAccessiblePage({ page });
});
