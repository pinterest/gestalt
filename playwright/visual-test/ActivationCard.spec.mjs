// @flow strict
import { test, expect } from '@playwright/test';

test('ActivationCard', async ({ page }) => {
  await page.goto('/visual-test/ActivationCard');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ActivationCard.png');
});
