// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('BannerSlim Accessibility check', async ({ page }) => {
  await page.goto('/web/bannerslim');
  await expectAccessiblePage({ page });
});
