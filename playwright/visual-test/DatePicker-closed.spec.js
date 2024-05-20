// @flow strict
import { expect, test } from '@playwright/test';

test('DatePicker visual regression check', async ({ page }) => {
  await page.goto('/visual-test/DatePicker-closed');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('DatePicker-closed.png');
});
