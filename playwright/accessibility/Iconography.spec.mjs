// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Iconography Accessibility check', async ({ page }) => {
  await page.goto('/iconography');
  await expectAccessiblePage({ page });
});
