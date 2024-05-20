// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS Avatar Accessibility check', async ({ page }) => {
  await page.goto('/ios/avatar');
  await expectAccessiblePage({ page });
});
