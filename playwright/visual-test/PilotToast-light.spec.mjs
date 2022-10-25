// @flow strict
import { test, expect } from '@playwright/test';

test('PilotToast light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/PilotToast-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('PilotToast-light.png');
});
