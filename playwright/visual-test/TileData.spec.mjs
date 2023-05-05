// @flow strict
import { test, expect } from '@playwright/test';

test('TileData light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TileData');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TileData.png');
});
