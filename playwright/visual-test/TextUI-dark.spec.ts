import { expect, test } from '@playwright/test';

test('TextUI dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TextUI-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TextUI-dark.png');
});
