// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Eslint Plugin Accessibility check', async ({ page }) => {
  await page.goto('/eslint_plugin');
  await expectAccessiblePage({ page });
});
