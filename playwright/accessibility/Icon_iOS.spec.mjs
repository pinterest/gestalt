// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS Icon Accessibility check', async ({ page }) => {
  await page.goto('/iOS/icon');
  await expectAccessiblePage({ page });
});
