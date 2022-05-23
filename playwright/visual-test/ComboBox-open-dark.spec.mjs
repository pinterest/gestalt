// @flow strict
import { test, expect } from '@playwright/test';

test('ComboBox visual regression check - dark', async ({ page }) => {
  await page.goto('/visual-test/ComboBox-open-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.click('label');
  await expect(locator).toHaveScreenshot('ComboBox-open-dark.png');
});
