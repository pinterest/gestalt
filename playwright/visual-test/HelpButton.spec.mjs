// @flow strict
import { test, expect } from '@playwright/test';

const BREAKPOINTS = { xs: 360 };

test('HelpButton visual regression check', async ({ page }) => {
  await page.setViewportSize({
    width: BREAKPOINTS.xs,
    height: BREAKPOINTS.xs,
  });

  await page.goto('/visual-test/HelpButton');

  await page.getByRole('button').click();

  const locator = page.locator('[data-test-id="visual-test"]');

  await expect(locator).toHaveScreenshot('HelpButton.png');
});
