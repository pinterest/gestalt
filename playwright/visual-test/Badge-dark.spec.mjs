// @flow strict
import { expect, test } from '@playwright/test';

test('Badge dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Badge-dark');

  await page.getByText('Info badge with tooltip').hover();

  const locator = page.locator('[data-test-id="visual-test"]');

  await expect(locator).toHaveScreenshot('Badge-dark.png');
});
