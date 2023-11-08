// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS Badge Page Accessibility check', async ({ page }) => {
  await page.goto('/iOS/badge');
  await expectAccessiblePage({ page });
});
