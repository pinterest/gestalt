// @flow strict
import { test, expect } from '@playwright/test';

test('RadioButton dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/RadioButton-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('RadioButton-dark.png');
});
