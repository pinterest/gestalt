// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Letterbox Accessibility check', async ({ page }) => {
  await page.goto('/letterbox');
  await expectAccessiblePage({ page });
});
