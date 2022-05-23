// @flow strict
import { test, expect } from '@playwright/test';

test('Badge visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Badge');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Badge.png');
});
