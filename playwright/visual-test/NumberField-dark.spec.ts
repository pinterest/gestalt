import { expect, test } from '@playwright/test';

test('NumberField visual regression check - dark', async ({ page }) => {
  await page.goto('/visual-test/NumberField-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await page.locator('input');
  await expect(locator).toHaveScreenshot('NumberField-dark.png');
});
