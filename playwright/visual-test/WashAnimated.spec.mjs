// @flow strict
import { expect, test } from '@playwright/test';

test('WashAnimated mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/WashAnimated');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('button').hover();
  await expect(locator).toHaveScreenshot('WashAnimated.png');
});
