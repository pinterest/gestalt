// @flow strict
import { expect, test } from '@playwright/test';

const BREAKPOINTS = { xs: 360 };

test('OverlayPanel mode visual regression check', async ({ page }) => {
  await page.setViewportSize({
    width: BREAKPOINTS.xs,
    height: BREAKPOINTS.xs,
  });
  await page.goto('/visual-test/OverlayPanel');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('OverlayPanel.png');
});
