// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Divider Accessibility check', async ({ page }) => {
  await page.goto('/web/divider');
  await expectAccessiblePage({ page });
});
