// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('BannerOverlay Accessibility check', async ({ page }) => {
  await page.goto('/web/BannerOverlay');
  await expectAccessiblePage({ page });
});
