// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Animation guidelines check', async ({ page }) => {
  await page.goto('/foundations/animation/guidelines');
  await expectAccessiblePage({ page });
});
