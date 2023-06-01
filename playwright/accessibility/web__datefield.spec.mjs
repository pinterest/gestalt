// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us DateField check', async ({ page }) => {
  await page.goto('/datefield');
  await expectAccessiblePage({ page });
});
