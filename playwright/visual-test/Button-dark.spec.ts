import { expect, test } from '@playwright/test';

test('Button dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Button-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Button-dark.png');
});
