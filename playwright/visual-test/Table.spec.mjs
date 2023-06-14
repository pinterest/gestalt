// @flow strict
import { expect, test } from '@playwright/test';

test('Table visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Table');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Table.png');
});
