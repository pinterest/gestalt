// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('ColorSchemeProvider Accessibility check', async ({ page }) => {
  await page.goto('/web/utilities/colorschemeprovider');
  await expectAccessiblePage({ page });
});
