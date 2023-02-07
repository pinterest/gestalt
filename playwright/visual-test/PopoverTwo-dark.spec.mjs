// @flow strict
import { test, expect } from '@playwright/test';

test('PopoverTwo dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/PopoverTwo-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('PopoverTwo-dark.png');
});
