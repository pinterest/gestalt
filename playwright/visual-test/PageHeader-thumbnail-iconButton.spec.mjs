// @flow strict
import { test, expect } from '@playwright/test';

test(`PageHeader visual regression check thumbnail - iconButton`, async ({
  page,
}) => {
  await page.setViewportSize({
    width: 768,
    height: 1080,
  });

  await page.goto('/visual-test/PageHeader-thumbnail-iconButton');

  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot(
    `PPageHeader-thumbnail-iconButton.png`
  );
});
