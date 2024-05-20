// @flow strict
import { expect, test } from '@playwright/test';

test('Accordion dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/Accordion?size=lg');
  const locator1 = page.locator('[data-test-id="visual-test"]');
  await expect(locator1).toHaveScreenshot('Accordion-lg.png');

  await page.goto('/visual-test/Accordion?size=sm');
  const locator2 = page.locator('[data-test-id="visual-test"]');
  await expect(locator2).toHaveScreenshot('Accordion-sm.png');

  await page.goto('/visual-test/Accordion?size=md');
  const locator3 = page.locator('[data-test-id="visual-test"]');
  await expect(locator3).toHaveScreenshot('Accordion-md.png');
});
