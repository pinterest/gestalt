// @flow strict
import { expect, test } from '@playwright/test';

test('Fieldset dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Fieldset-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Fieldset-dark.png');
});
