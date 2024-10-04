import { expect, test } from '@playwright/test';

test('SearchGuideLink dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SearchGuideLink-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('SearchGuideLink-dark.png');
});
