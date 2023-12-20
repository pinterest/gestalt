// @flow strict
import { expect, test } from '@playwright/test';

test('BannerOverlay visual regression check', async ({ page }) => {
  await page.goto('http://localhost:8888/visual-test/BannerOverlay-dark');
  const locator = page
    .locator('[data-test-id="visual-test"] div')
    .filter({ hasText: 'BannerOverlay' })
    .nth(1);
  await expect(locator).toHaveScreenshot('BannerOverlay-dark.png');
});
