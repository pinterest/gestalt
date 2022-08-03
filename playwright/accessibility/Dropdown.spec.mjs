// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Dropdown Accessibility check', async ({ page }) => {
  await page.goto('/web/dropdown');
  await expectAccessiblePage({ page });
});
