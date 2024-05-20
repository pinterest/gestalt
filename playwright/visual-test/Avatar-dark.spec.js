// @flow strict
import { expect, test } from '@playwright/test';

test('Avatar dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Avatar-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Avatar-dark.png');
});
