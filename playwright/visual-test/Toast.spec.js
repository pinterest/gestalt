// @flow strict
import { expect, test } from '@playwright/test';

test('Toast visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Toast');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Toast.png');
});
