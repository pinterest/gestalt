import { expect, test } from '@playwright/test';

test('SearchGuideLink visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SearchGuideLink');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('SearchGuideLink.png');
});
