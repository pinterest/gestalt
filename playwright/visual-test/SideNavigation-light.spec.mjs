// @flow strict
import { test, expect } from '@playwright/test';

test('SideNavigation light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SideNavigation-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('SideNavigation-light.png');
});
