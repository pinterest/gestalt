// @flow strict
import { test, expect } from '@playwright/test';

test('PilotToast dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/PilotToast-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('PilotToast-dark.png');
});
