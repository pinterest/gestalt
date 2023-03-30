// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Label Accessibility check', async ({ page }) => {
  await page.goto('/web/label');
  await expectAccessiblePage({ page });
});
