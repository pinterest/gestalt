// @flow strict
import { expect, test } from '@playwright/test';

test('SelectList visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SelectList');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('SelectList.png');
});
