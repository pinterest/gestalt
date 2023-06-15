// @flow strict
import { expect, test } from '@playwright/test';

test('Status dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Status-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Status-dark.png');
});
