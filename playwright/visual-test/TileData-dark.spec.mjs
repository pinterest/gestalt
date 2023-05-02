// @flow strict
import { test, expect } from '@playwright/test';

test('TileData dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TileData-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TileData-dark.png');
});
