// @flow strict
import { test, expect } from '@playwright/test';

test('Callout visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Callout');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Callout.png');
});
