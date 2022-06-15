// @flow strict
import { test, expect } from '@playwright/test';

test('Button dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Icon-list-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Icon-list-dark.png');
});
