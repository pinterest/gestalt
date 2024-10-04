import { expect, test } from '@playwright/test';

test('SearchGuide visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SearchGuide');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('SearchGuide.png');
});
