// @flow strict
import { test, expect } from '@playwright/test';

test('Box dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Box-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Box-dark.png');
});
