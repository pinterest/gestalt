// @flow strict
import { expect, test } from '@playwright/test';

test('Switch dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Switch-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Switch-dark.png');
});
