// @flow strict
import { expect, test } from '@playwright/test';

test('PopoverEducational-dark mode visual regression check', async ({
  page,
}) => {
  await page.goto('/visual-test/PopoverEducational-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('button').click();
  await expect(locator).toHaveScreenshot('PopoverEducational-dark.png');
});
