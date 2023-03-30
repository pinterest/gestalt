// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Overview web component page check', async ({ page }) => {
  await page.goto('/web/overview');
  await expectAccessiblePage({ page });
});
