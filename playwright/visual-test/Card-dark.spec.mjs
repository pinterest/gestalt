// @flow strict
import { test, expect } from '@playwright/test';

test('Card dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Card-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('button').hover();
  await expect(locator).toHaveScreenshot('Card-dark.png');
});
