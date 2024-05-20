// @flow strict
import { expect, test } from '@playwright/test';

test('Dropdown visual regression check - dark', async ({ page }) => {
  await page.goto('/visual-test/Dropdown-open-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.click('button');
  await expect(locator).toHaveScreenshot('Dropdown-open-dark.png');
});
