// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('TagData Accessibility check', async ({ page }) => {
  await page.goto('/web/tagdata');
  await expectAccessiblePage({ page });
});
