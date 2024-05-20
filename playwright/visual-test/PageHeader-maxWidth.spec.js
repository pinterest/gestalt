// @flow strict
import { expect, test } from '@playwright/test';

test(`PageHeader visual regression check - maxWidth`, async ({ page }) => {
  await page.setViewportSize({
    width: 1312,
    height: 1080,
  });

  await page.goto('/visual-test/PageHeader-maxWidth');

  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot(`PageHeader-maxWidth.png`);
});
