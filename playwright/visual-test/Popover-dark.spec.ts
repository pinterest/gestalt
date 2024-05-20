import { expect, test } from '@playwright/test';

test('Popover-dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Popover-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('button').click();
  await expect(locator).toHaveScreenshot('Popover-dark.png');
});
