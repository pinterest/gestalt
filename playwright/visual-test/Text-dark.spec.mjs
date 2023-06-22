// @flow strict
import { expect, test } from '@playwright/test';

test('Text dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Text-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Text-dark.png');
});
