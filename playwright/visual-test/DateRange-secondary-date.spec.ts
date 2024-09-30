
import { expect, test } from '@playwright/test';

test('DateRange secondary date range visual regression check', async ({ page }) => {
  await page.goto('/visual-test/DateRange-secondary-date');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('DateRange-dark.png');
});
