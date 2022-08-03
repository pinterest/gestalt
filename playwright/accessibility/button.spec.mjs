// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Button Accessibility check', async ({ page }) => {
  await page.goto('/web/button');
  await expectAccessiblePage({ page });
});
