// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us DateRange check', async ({ page }) => {
  await page.goto('/daterange');
  await expectAccessiblePage({ page });
});
