import { expect, test } from '@playwright/test';

test('Icon list visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Icon-list');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Icon-list.png');
  await page.goto('/visual-test/Icon-vr-theme-list');
  const locatorvr = page.locator('[data-test-id="visual-test"]');
  await expect(locatorvr).toHaveScreenshot('Icon-vr-theme-list.png');
});
