// @flow strict
import { expect, test } from '@playwright/test';

test('DateField dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/DateField-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('DateField-dark.png');
});
