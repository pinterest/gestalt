// @flow strict
import { expect, test } from '@playwright/test';

test('AvatarGroup dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/AvatarGroup-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('AvatarGroup-dark.png');
});
