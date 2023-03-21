// @flow strict
import { test, expect } from '@playwright/test';

test('Image dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Image-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Image-dark.png');
});
