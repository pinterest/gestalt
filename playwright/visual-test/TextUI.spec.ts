import { expect, test } from '@playwright/test';

test('TextUI visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TextUI');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TextUI.png');
});
