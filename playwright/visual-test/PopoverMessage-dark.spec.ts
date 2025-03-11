import { expect, test } from '@playwright/test';

test('PopoverMessage-dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/PopoverMessage-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('button').click();
  await expect(locator).toHaveScreenshot('PopoverMessage-dark.png');
});
