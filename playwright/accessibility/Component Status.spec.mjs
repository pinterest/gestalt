// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Component status check', async ({ page }) => {
  await page.goto('/component_status');
  await expectAccessiblePage({ page });
});
