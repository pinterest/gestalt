// @flow strict
import { test, expect } from '@playwright/test';

test('Badge dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Badge-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Badge-dark.png');
});
