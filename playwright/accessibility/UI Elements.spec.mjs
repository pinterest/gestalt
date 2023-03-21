// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Content standards UI Elements check', async ({ page }) => {
  await page.goto('/foundations/content_standards/ui_elements');
  await expectAccessiblePage({ page });
});
