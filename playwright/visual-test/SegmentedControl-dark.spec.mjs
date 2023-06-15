// @flow strict
import { expect, test } from '@playwright/test';

test('SegmentedControl-dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/SegmentedControl-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('SegmentedControl-dark.png');
});
