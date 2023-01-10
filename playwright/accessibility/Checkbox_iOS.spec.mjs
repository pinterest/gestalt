// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS Checkbox Accessibility check', async ({ page }) => {
  await page.goto('/ios/checkbox');
  await expectAccessiblePage({ page });
});
