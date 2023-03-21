// @flow strict
import { test, expect } from '@playwright/test';

test('ComponentName dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ComponentName-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ComponentName-dark.png');
});
