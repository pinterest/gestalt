// @flow strict
import { test, expect } from '@playwright/test';

test('ProgressBar dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ProgressBar-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ProgressBar-dark.png');
});
