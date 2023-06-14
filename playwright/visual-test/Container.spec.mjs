// @flow strict
import { expect, test } from '@playwright/test';

test('Container visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Container');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Container.png');
});
