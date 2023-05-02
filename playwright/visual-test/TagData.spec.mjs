// @flow strict
import { test, expect } from '@playwright/test';

test('TagData light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TagData-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TagData-light.png');
});
