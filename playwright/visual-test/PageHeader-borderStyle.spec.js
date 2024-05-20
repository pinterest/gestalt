// @flow strict
import { expect, test } from '@playwright/test';

test(`PageHeader visual regression check - borderStyle`, async ({ page }) => {
  await page.setViewportSize({
    width: 768,
    height: 1080,
  });

  await page.goto('/visual-test/PageHeader-borderStyle');

  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot(`PageHeader-borderStyle.png`);
});
