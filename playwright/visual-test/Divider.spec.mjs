// @flow strict
import { expect, test } from '@playwright/test';

test('Divider visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Divider');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Divider.png');
});
