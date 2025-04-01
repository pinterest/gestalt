import { expect, test } from '@playwright/test';

test('AvatarGroupCluster visual regression check', async ({ page }) => {
  await page.goto('/visual-test/AvatarGroupCluster');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('AvatarGroupCluster.png');
});
