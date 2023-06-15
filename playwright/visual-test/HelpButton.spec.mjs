// @flow strict
import { expect, test } from '@playwright/test';

const BREAKPOINTS = { xs: 360 };

test('HelpButton visual regression check', async ({ page }) => {
  // Required to screenshot get the IconButton + Popover opened
  // The value of breakpoint was selected by others files, only to keep a easy pattern to future centralization
  await page.setViewportSize({
    width: BREAKPOINTS.xs,
    height: BREAKPOINTS.xs,
  });

  await page.goto('/visual-test/HelpButton');

  await page.getByRole('button').click();

  const locator = page.locator('[data-test-id="visual-test"]');

  await expect(locator).toHaveScreenshot('HelpButton.png');
});
