// @flow strict
import { test, expect } from '@playwright/test';

test('ProgressBar light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ProgressBar-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ProgressBar-light.png');
});
