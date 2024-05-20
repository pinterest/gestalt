import { expect, test } from '@playwright/test';

const BREAKPOINTS = { xs: 360 } as const;

test('Modal mode visual regression check', async ({ page }) => {
  await page.setViewportSize({
    width: BREAKPOINTS.xs,
    height: BREAKPOINTS.xs,
  });
  await page.goto('/visual-test/Modal');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('Modal.png');
});
