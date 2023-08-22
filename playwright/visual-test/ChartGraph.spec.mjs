// @flow strict
import { expect, test } from '@playwright/test';

test('ChartGraph light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ChartGraph-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ChartGraph-light.png');
});
