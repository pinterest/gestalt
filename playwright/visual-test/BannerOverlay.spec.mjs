// @flow strict
import { expect, test } from '@playwright/test';

test('BannerOverlay visual regression check', async ({ page }) => {
  await page.goto('/visual-test/BannerOverlay');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('BannerOverlay.png');
});
