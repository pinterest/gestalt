import { expect, test } from '@playwright/test';

test('PopoveMessage mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/PopoveMessage');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('button').click();
  await expect(locator).toHaveScreenshot('PopoveMessage.png');
});
