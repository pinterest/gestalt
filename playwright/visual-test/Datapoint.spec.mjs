// @flow strict
import { expect, test } from '@playwright/test';

test('Datapoint visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Datapoint');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Datapoint.png');
});
