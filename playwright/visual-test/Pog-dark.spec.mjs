// @flow strict
import { test, expect } from '@playwright/test';

test('Pog visual dark mode regression check', async ({ page }) => {
  await page.goto('/visual-test/Pog-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Pog-dark.png');
});
