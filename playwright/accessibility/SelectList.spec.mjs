// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('SelectList Accessibility check', async ({ page }) => {
  await page.goto('/selectlist');
  await expectAccessiblePage({ page });
});
