// @flow strict
import { expect, test } from '@playwright/test';

test('Flex visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Flex');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Flex.png');
});
