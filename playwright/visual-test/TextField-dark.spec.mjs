// @flow strict
import { test, expect } from '@playwright/test';

test('TextField dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TextField-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TextField-dark.png');
});
