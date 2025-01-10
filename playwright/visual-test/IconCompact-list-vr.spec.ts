import { expect, test } from '@playwright/test';

test('IconCompact list visual regression check', async ({ page }) => {
  await page.goto('/visual-test/IconCompact-list-vr');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('IconCompact-list-vr.png');
});
