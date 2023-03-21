// @flow strict
import { test, expect } from '@playwright/test';

test('Heading visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Heading');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Heading.png');
});
