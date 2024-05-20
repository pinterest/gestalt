// @flow strict
import { expect, test } from '@playwright/test';

test('ComboBox visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ComboBox-closed');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ComboBox-closed.png');
});
