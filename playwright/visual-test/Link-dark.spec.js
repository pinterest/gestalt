// @flow strict
import { expect, test } from '@playwright/test';

test('Link dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Link-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Link-dark.png');
});
