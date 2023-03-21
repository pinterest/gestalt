// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Toast Accessibility check', async ({ page }) => {
  await page.goto('/web/toast');
  await expectAccessiblePage({ page });
});
