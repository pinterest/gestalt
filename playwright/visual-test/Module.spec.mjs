// @flow strict
import { expect, test } from '@playwright/test';

test('Module visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Module');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Module.png');
});
