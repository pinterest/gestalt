// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS ActionList Accessibility check', async ({ page }) => {
  await page.goto('/ios/actionlist');
  await expectAccessiblePage({ page });
});
