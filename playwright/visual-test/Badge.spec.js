// @flow strict
import { expect, test } from '@playwright/test';

test('Badge visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Badge');

  await page.getByText('Info badge with tooltip').hover();

  const locator = page.locator('[data-test-id="visual-test"]');

  await expect(locator).toHaveScreenshot('Badge.png');
});
