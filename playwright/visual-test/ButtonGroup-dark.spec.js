// @flow strict
import { expect, test } from '@playwright/test';

test('ButtonGroup dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ButtonGroup-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ButtonGroup-dark.png');
});
