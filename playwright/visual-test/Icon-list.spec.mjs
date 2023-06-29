// @flow strict
import { expect, test } from '@playwright/test';

test('Icon list visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Icon-list');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Icon-list.png');
});
