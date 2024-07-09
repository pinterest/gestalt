import { expect, test } from '@playwright/test';

test('Icon list visual VR theme regression check', async ({ page }) => {
  await page.goto('/visual-test/Icon-list-vr');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Icon-list-vr.png');
});
