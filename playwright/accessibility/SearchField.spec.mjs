// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('SearchField Accessibility check', async ({ page }) => {
  await page.goto('/searchfield');
  await expectAccessiblePage({ page });
});
