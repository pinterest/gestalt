// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us DensityProvider check', async ({ page }) => {
  await page.goto('/densityprovider');
  await expectAccessiblePage({ page });
});
