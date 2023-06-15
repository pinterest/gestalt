// @flow strict
import { expect, test } from '@playwright/test';

test('TextArea dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TextArea-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TextArea-dark.png');
});
