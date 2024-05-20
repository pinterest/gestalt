// @flow strict
import { expect, test } from '@playwright/test';

test('TextField visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TextField');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TextField.png');
});
