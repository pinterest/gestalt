// @flow strict
import { expect, test } from '@playwright/test';

test('ZIndex mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ZIndex');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ZIndex.png');
});
