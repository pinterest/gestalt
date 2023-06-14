// @flow strict
import { expect, test } from '@playwright/test';

test('Box visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Box');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Box.png');
});
