import { expect, test } from '@playwright/test';

test('PopoverMessage mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/PopoverMessage');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('button').click();
  await expect(locator).toHaveScreenshot('PopoverMessage.png');
});
