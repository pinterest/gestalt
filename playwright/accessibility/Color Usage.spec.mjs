// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Color usage Accessibility check', async ({ page }) => {
  await page.goto('/color_usage');
  await expectAccessiblePage({ page });
});
