// @flow strict
import { test, expect } from '@playwright/test';

test('SideNavigation mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SideNavigation');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('SideNavigation.png');
});
