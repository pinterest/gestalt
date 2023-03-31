// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Overview foundations page check', async ({ page }) => {
  await page.goto('/foundations/overview');
  await expectAccessiblePage({ page });
});
