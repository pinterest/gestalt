// @flow strict
import { expect, test } from '@playwright/test';

test('DensityProvider dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/DensityProvider-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('DensityProvider-dark.png');
});
