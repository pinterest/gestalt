// @flow strict
import { test, expect } from '@playwright/test';

const BREAKPOINTS = { xs: 400 };

test('Sheet-dark mode visual regression check', async ({ page }) => {
  await page.setViewportSize({
    width: BREAKPOINTS.xs,
    height: BREAKPOINTS.xs,
  });
  await page.goto('/visual-test/Sheet-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Sheet-dark.png');
});
