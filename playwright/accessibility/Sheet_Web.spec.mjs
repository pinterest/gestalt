// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Web Sheet Page Accessibility check', async ({ page }) => {
  await page.goto('/web/sheet');
  await expectAccessiblePage({ page });
});
