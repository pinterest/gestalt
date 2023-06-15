// @flow strict
import { expect, test } from '@playwright/test';

test('Module dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Module-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Module-dark.png');
});
