// @flow strict
import { test, expect } from '@playwright/test';

test('NumberField visual regression', async ({ page }) => {
  await page.goto('/visual-test/NumberField');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.focus('input');
  await expect(locator).toHaveScreenshot('NumberField.png');
});
