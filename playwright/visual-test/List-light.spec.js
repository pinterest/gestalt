// @flow strict
import { expect, test } from '@playwright/test';

test('List light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/List-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('List-light.png');
});
