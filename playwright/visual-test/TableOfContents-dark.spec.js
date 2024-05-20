// @flow strict
import { expect, test } from '@playwright/test';

test('TableOfContents dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/TableOfContents-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('TableOfContents-dark.png');
});
