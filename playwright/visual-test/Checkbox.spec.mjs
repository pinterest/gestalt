// @flow strict
import { test, expect } from '@playwright/test';

test('Checkbox visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Checkbox');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Checkbox.png');
});
