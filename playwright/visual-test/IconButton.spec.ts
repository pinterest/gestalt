import { expect, test } from '@playwright/test';

test('Button visual regression check', async ({ page }) => {
  await page.goto('/visual-test/IconButton');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('IconButton.png');
});
