// @flow strict
import { expect, test } from '@playwright/test';

test('BannerUpsell dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/BannerUpsell-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('BannerUpsell-dark.png');
});
