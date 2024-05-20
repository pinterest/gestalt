// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Messaging overview accessibility check', async ({ page }) => {
  await page.goto('/foundations/international_design/pluralization');
  await expectAccessiblePage({ page });
});
