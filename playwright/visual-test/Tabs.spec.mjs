// @flow strict
import { test, expect } from '@playwright/test';

test('Tabs mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Tabs');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Tabs.png');
});
