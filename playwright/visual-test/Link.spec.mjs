// @flow strict
import { expect, test } from '@playwright/test';

test('Link visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Link');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Link.png');
});
