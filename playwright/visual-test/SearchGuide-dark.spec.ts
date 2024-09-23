import { expect, test } from '@playwright/test';

test('SearchGuide dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SearchGuide-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('SearchGuide-dark.png');
});
