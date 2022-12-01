// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Content guidelines Accessibility check', async ({ page }) => {
  await page.goto('/foundations/content/guidelines');
  await expectAccessiblePage({ page });
});
