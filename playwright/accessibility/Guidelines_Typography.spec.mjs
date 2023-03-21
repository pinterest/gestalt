// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Typography guidelines check', async ({ page }) => {
  await page.goto('/foundations/typography/guidelines');
  await expectAccessiblePage({ page });
});
