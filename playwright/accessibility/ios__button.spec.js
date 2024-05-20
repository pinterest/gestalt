// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS Button Page Accessibility check', async ({ page }) => {
  await page.goto('/ios/button');
  await expectAccessiblePage({ page });
});
