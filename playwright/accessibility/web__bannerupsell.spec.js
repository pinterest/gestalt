// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('BannerUpsell Accessibility check', async ({ page }) => {
  await page.goto('/web/bannerupsell');
  await expectAccessiblePage({ page });
});
