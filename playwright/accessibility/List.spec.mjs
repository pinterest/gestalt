// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us List check', async ({ page }) => {
  await page.goto('/web/list');
  await expectAccessiblePage({ page });
});
