// @flow strict
import { expect, test } from '@playwright/test';

test('Module dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Module-dark?size=lg');
  const locator1 = page.locator('[data-test-id="visual-test"]');
  await expect(locator1).toHaveScreenshot('Module-dark-lg.png');

  await page.goto('/visual-test/Module-dark?size=sm');
  const locator2 = page.locator('[data-test-id="visual-test"]');
  await expect(locator2).toHaveScreenshot('Module-dark-sm.png');

  await page.goto('/visual-test/Module-dark?size=md');
  const locator3 = page.locator('[data-test-id="visual-test"]');
  await expect(locator3).toHaveScreenshot('Module-dark-md.png');
});
