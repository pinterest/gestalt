// @flow strict
import { test, expect } from '@playwright/test';

test('Tooltip visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Tooltip');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.focus('button');
  await expect(locator).toHaveScreenshot('Tooltip.png');
});
