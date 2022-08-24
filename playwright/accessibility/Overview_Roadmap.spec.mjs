// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Overview Roadmap component page check', async ({ page }) => {
  await page.goto('/roadmap/overview');
  await expectAccessiblePage({ page });
});
