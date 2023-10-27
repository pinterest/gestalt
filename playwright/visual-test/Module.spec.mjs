// @flow strict
import { expect, test } from '@playwright/test';

test('Module visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Module?size=lg');
  const locator1 = page.locator('[data-test-id="visual-test"]');
  await expect(locator1).toHaveScreenshot('Module-lg.png');

  await page.goto('/visual-test/Module?size=sm');
  const locator2 = page.locator('[data-test-id="visual-test"]');
  await expect(locator2).toHaveScreenshot('Module-sm.png');

  await page.goto('/visual-test/Module?size=md');
  const locator3 = page.locator('[data-test-id="visual-test"]');
  await expect(locator3).toHaveScreenshot('Module-md.png');
});
