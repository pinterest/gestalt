// @flow strict
import { expect, test } from '@playwright/test';

test('Pulsar-dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Pulsar-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Pulsar-dark.png');
});
