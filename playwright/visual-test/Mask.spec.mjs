// @flow strict
import { expect, test } from '@playwright/test';

test('Mask mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Mask');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Mask.png');
});
