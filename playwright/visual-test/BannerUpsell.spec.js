// @flow strict
import { expect, test } from '@playwright/test';

test('BannerUpsell visual regression check', async ({ page }) => {
  await page.goto('/visual-test/BannerUpsell');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('BannerUpsell.png');
});
