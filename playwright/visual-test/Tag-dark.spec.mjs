// @flow strict
import { expect, test } from '@playwright/test';

test('Tag visual dark mode regression check', async ({ page }) => {
  await page.goto('/visual-test/Tag-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Tag-dark.png');
});
