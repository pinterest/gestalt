// @flow strict
import { expect, test } from '@playwright/test';

test('Fieldset visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Fieldset');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Fieldset.png');
});
