// @flow strict
import { expect, test } from '@playwright/test';

test('Collage visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Collage', {
    // Wait until all network requests have finished
    waitUntil: 'networkidle',
  });
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Collage.png');
});
