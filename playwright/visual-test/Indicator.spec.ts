import { expect, test } from '@playwright/test';

test('Indicator visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Indicator');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Indicator.png');
});
