// @flow strict
import { expect, test } from '@playwright/test';

test('BannerCallout visual regression check', async ({ page }) => {
  await page.goto('/visual-test/BannerCallout');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('BannerCallout.png');
});
