// @flow strict
import { expect, test } from '@playwright/test';

test('Masonry mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Masonry');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Masonry.png');
});
