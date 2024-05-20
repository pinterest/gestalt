// @flow strict
import { expect, test } from '@playwright/test';

test('Switch visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Switch');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Switch.png');
});
