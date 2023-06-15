// @flow strict
import { expect, test } from '@playwright/test';

test('Upsell visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Upsell');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Upsell.png');
});
