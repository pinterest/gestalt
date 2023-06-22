// @flow strict
import { expect, test } from '@playwright/test';

test(`PageHeader visual regression check thumbnail - iconButton`, async ({
  page,
}) => {
  await page.setViewportSize({
    width: 768,
    height: 1080,
  });

  await page.goto(
    '/visual-test/PageHeader-thumbnail-iconButton',
    // Wait until all network requests have finished
    { waitUntil: 'networkidle' }
  );

  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot(`PageHeader-thumbnail-iconButton.png`);
});
