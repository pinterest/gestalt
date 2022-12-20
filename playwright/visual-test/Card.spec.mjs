// @flow strict
import { test, expect } from '@playwright/test';

test('Card mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Card');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('button').hover();
  await expect(locator).toHaveScreenshot('Card.png');
});
