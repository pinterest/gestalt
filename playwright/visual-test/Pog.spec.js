// @flow strict
import { expect, test } from '@playwright/test';

test('Pog visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Pog');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Pog.png');
});
