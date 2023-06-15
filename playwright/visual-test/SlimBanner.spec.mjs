// @flow strict
import { expect, test } from '@playwright/test';

test('SlimBanner visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SlimBanner');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('SlimBanner.png');
});
