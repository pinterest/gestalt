// @flow strict
import { expect, test } from '@playwright/test';

test('Callout dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Callout-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Callout-dark.png');
});
