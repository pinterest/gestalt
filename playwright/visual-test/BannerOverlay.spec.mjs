// @flow strict
import { expect, test } from '@playwright/test';

test('BannerOverlay visual regression check', async ({ page }) => {
  await page.goto('http://localhost:8888/visual-test/BannerOverlay');
  const locator = page
    .locator('div')
    .filter({ hasText: 'BannerOverlay' })
    .nth(2);
  await expect(locator).toHaveScreenshot('BannerOverlay.png');
});
