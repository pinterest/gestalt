// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('HandlersProvider Accessibility check', async ({ page }) => {
  await page.goto('/web/utilities/handlersprovider');
  await expectAccessiblePage({ page });
});
