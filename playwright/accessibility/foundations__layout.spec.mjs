// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Layouts Accessibility check', async ({ page }) => {
  await page.goto('/foundations/layout');
  await expectAccessiblePage({ page });
});
