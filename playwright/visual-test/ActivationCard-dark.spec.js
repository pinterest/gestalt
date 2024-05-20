// @flow strict
import { expect, test } from '@playwright/test';

test('ActivationCard dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ActivationCard-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ActivationCard-dark.png');
});
