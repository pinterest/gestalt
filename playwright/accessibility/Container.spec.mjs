// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Container Accessibility check', async ({ page }) => {
  await page.goto('/container');
  await expectAccessiblePage({ page });
});
