// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Screen sizes Accessibility check', async ({ page }) => {
  await page.goto('/foundations/screen_sizes');
  await expectAccessiblePage({ page });
});
