// @flow strict
import { expect, test } from '@playwright/test';

const BREAKPOINTS = { xs: 360 };

test('ModalAlert-dark mode visual regression check', async ({ page }) => {
  await page.setViewportSize({
    width: BREAKPOINTS.xs,
    height: BREAKPOINTS.xs,
  });
  await page.goto('/visual-test/ModalAlert-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ModalAlert-dark.png');
});
