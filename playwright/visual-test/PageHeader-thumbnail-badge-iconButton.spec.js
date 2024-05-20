// @flow strict
import { expect, test } from '@playwright/test';

const BREAKPOINTS = { xs: 360, sm: 576, md: 768, lg: 1313 };

Object.keys(BREAKPOINTS).forEach((size) => {
  test(`PageHeader visual regression check ${size} - thumbnail - badge - iconButton`, async ({
    page,
  }) => {
    await page.setViewportSize({
      width: BREAKPOINTS[size],
      height: 1080,
    });

    await page.goto('/visual-test/PageHeader-thumbnail-badge-iconButton', {
      // Wait until all network requests have finished
      waitUntil: 'networkidle',
    });

    const locator = page.locator('[data-test-id="visual-test"]');
    await expect(locator).toHaveScreenshot(
      `PageHeader-thumbnail-badge-iconButton-${size}.png`
    );
  });
});
