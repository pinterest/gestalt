import { expect, test } from '@playwright/test';

test('Letterbox mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Letterbox');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Letterbox.png');
});
