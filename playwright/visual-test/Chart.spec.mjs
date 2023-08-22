// @flow strict
import { test, expect } from '@playwright/test';

test('Chart light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Chart-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Chart-light.png');
});
