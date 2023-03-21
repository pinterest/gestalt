// @flow strict
import { test, expect } from '@playwright/test';

test('TextArea visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TextArea');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TextArea.png');
});
