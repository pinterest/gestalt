// @flow strict
import { test, expect } from '@playwright/test';

test('RadioButton visual regression check', async ({ page }) => {
  await page.goto('/visual-test/RadioButton');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('RadioButton.png');
});
