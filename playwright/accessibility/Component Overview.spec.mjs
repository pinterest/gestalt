// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Component overview check', async ({ page }) => {
  await page.goto('/component_overview');
  await expectAccessiblePage({ page });
});
