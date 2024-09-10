import { expect, test } from '@playwright/test';

test('TextCompact dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TextCompact-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TextCompact-dark.png');
});
