// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Accessibility', async ({ page }) => {
  await page.goto('/home');
  await expectAccessiblePage({ page });
});
