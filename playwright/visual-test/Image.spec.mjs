// @flow strict
import { test, expect } from '@playwright/test';

test('Image visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Image');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Image.png');
});
