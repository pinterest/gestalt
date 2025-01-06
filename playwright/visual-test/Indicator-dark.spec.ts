import { expect, test } from '@playwright/test';

test('Indicator dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Indicator-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Indicator-dark.png');
});
