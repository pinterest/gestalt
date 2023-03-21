// @flow strict
import { test, expect } from '@playwright/test';

test('Datapoint dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Datapoint-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Datapoint-dark.png');
});
