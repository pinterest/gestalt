// @flow strict
import { expect, test } from '@playwright/test';

test('TagData dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TagData-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TagData-dark.png');
});
