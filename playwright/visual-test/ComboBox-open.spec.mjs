// @flow strict
import { expect, test } from '@playwright/test';

test('ComboBox visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ComboBox-open');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.click('label');
  await expect(locator).toHaveScreenshot('ComboBox-open.png');
});
