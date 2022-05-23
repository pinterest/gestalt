// @flow strict
import { test, expect } from '@playwright/test';

test('Tag visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Tag');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Tag.png');
});
