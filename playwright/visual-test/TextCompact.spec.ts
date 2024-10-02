import { expect, test } from '@playwright/test';

test('TextCompact visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TextCompact');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TextCompact.png');
});
