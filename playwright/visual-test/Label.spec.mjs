// @flow strict
import { expect, test } from '@playwright/test';

test('Label visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Label');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Label.png');
});
