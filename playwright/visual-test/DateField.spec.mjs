// @flow strict
import { test, expect } from '@playwright/test';

test('DateField light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/DateField-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('DateField-light.png');
});
