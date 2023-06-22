// @flow strict
import { expect, test } from '@playwright/test';

test('Upsell dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Upsell-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Upsell-dark.png');
});
