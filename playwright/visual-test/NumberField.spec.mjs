// @flow strict
import { expect, test } from '@playwright/test';

test('NumberField visual regression', async ({ page }) => {
  await page.goto('/visual-test/NumberField');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('input');
  await expect(locator).toHaveScreenshot('NumberField.png');
});
