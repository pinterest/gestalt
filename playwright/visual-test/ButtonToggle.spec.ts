import { expect, test } from '@playwright/test';

test('ButtonToggle visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ButtonToggle');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ButtonToggle.png');
});
