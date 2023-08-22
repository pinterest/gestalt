// @flow strict
import { test, expect } from '@playwright/test';

test('Chart dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Chart-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Chart-dark.png');
});
