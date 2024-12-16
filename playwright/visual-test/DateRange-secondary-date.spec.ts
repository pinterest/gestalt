import { expect, test } from '@playwright/test';

test('DateRange secondaryHighlight range appears when selected', async ({ page }) => {
  await page.goto('/visual-test/DateRange-secondary-date');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('DateRange-secondary-range.png');
});
