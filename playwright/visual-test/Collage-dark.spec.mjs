// @flow strict
import { test, expect } from '@playwright/test';

test('Collage dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Collage-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Collage-dark.png');
});
