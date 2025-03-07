import { expect, test } from '@playwright/test';

test('PopoveMessage-dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/PopoveMessage-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('button').click();
  await expect(locator).toHaveScreenshot('PopoveMessage-dark.png');
});
