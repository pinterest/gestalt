// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Home Accessibility check', async ({ page }) => {
  await page.goto('/home');
  await expectAccessiblePage({ page });
});
