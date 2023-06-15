// @flow strict
import { expect, test } from '@playwright/test';

test('Tooltip visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Tooltip');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.focus('button', { timeout: 2000 });
  await page.locator('div[role="tooltip"]');
  await expect(locator).toHaveScreenshot('Tooltip.png');
});
