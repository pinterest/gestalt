// @flow strict
import { expect, test } from '@playwright/test';

test('Video visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Video');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Video.png');
});
