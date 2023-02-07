// @flow strict
import { test, expect } from '@playwright/test';

test('PopoverTwo light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/PopoverTwo-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('PopoverTwo-light.png');
});
