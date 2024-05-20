// @flow strict
import { expect, test } from '@playwright/test';

test('SearchField dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SearchField-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('SearchField-dark.png');
});
