// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS Switch Accessibility check', async ({ page }) => {
  await page.goto('/ios/switch');
  await expectAccessiblePage({ page });
});
