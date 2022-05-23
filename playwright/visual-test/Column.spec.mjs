// @flow strict
import { test, expect } from '@playwright/test';

test('Column visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Column');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Column.png');
});
