// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS Sheet Page Accessibility check', async ({ page }) => {
  await page.goto('/iOS/sheet');
  await expectAccessiblePage({ page });
});
