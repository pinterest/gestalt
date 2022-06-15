// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('TextArea Accessibility check', async ({ page }) => {
  await page.goto('/textarea');
  await expectAccessiblePage({ page });
});
