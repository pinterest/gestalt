// @flow strict
import { expect, test } from '@playwright/test';

test('Button dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ButtonLink-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ButtonLink-dark.png');
});
