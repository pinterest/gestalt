// @flow strict
import { expect, test } from '@playwright/test';

test('Avatar visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Avatar');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Avatar.png');
});
