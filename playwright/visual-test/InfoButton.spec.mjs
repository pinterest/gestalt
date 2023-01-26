// @flow strict
import { test, expect } from '@playwright/test';

test('Button visual regression check', async ({ page }) => {
  await page.goto('/visual-test/InfoButton');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('InfoButton.png');
});
