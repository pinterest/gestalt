// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('SearchField Accessibility check', async ({ page }) => {
  await page.goto('/web/searchfield');
  await expectAccessiblePage({ page });
});
