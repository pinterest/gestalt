// @flow strict
import { expect, test } from '@playwright/test';

test('DateRange light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/DateRange-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('DateRange-light.png');
});
