// @flow strict
import { expect, test } from '@playwright/test';

test('ChartGraph dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ChartGraph-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ChartGraph-dark.png');
});
