// @flow strict
import { expect, test } from '@playwright/test';

test('SheetMobile dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SheetMobile-dark');
  const locator = page.getByRole('dialog');
  await expect(locator).toHaveScreenshot('SheetMobile-dark.png');
});
