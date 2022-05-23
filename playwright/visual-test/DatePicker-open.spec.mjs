// @flow strict
import { test, expect } from '@playwright/test';

test('DatePicker visual regression check', async ({ page }) => {
  await page.goto('/visual-test/DatePicker-open');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.click('label');
  await expect(locator).toHaveScreenshot('DatePicker-open.png');
});
