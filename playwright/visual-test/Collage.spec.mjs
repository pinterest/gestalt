// @flow strict
import { test, expect } from '@playwright/test';

test('Collage visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Collage');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Collage.png');
});
