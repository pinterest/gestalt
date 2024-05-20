// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('About us DateField check', async ({ page }) => {
  await page.goto('/datefield');
  await expectAccessiblePage({ page });
});
