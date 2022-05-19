// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Color examples Accessibility check', async ({ page }) => {
  await page.goto('/color_examples');
  await expectAccessiblePage({ page });
});
