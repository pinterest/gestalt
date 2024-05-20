import { expect, test } from '@playwright/test';

test('Divider dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Divider-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Divider-dark.png');
});
