import { expect, test } from '@playwright/test';

test('AvatarGroupCluster dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/AvatarGroupCluster-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('AvatarGroupCluster-dark.png');
});
