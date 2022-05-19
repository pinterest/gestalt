// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Modal Accessibility check', async ({ page }) => {
  await page.goto('/modal');
  await expectAccessiblePage({ page });
});
