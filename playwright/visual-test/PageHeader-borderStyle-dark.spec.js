// @flow strict
import { expect, test } from '@playwright/test';

test(`PageHeader visual regression check - borderStyle / dark`, async ({
  page,
}) => {
  await page.setViewportSize({
    width: 768,
    height: 1080,
  });

  await page.goto('/visual-test/PageHeader-borderStyle-dark');

  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot(`PageHeader-borderStyle-dark.png`);
});
