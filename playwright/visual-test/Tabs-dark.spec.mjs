// @flow strict
import { test, expect } from '@playwright/test';

test('Tabs-dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Tabs-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Tabs-dark.png');
});
