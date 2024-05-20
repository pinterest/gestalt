// @flow strict
import { expect, test } from '@playwright/test';

test('ButtonToggle dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ButtonToggle-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ButtonToggle-dark.png');
});
