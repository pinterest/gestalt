// @flow strict
import { test, expect } from '@playwright/test';

test('ButtonGroup visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ButtonGroup');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ButtonGroup.png');
});
