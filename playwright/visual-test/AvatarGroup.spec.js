// @flow strict
import { expect, test } from '@playwright/test';

test('AvatarGroup visual regression check', async ({ page }) => {
  await page.goto('/visual-test/AvatarGroup');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('AvatarGroup.png');
});
