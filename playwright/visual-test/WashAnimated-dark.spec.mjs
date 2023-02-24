// @flow strict
import { test, expect } from '@playwright/test';

test('WashAnimated dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/WashAnimated-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('button').hover();
  await expect(locator).toHaveScreenshot('WashAnimated-dark.png');
});
