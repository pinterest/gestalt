// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Screen sizes Accessibility check', async ({ page }) => {
  await page.goto('/screen_sizes');
  await expectAccessiblePage({ page });
});
