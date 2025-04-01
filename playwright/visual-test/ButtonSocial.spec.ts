import { expect, test } from '@playwright/test';

test('ButtonSocial light mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ButtonSocial-light');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ButtonSocial-light.png');
});
