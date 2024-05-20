// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS Icon Accessibility check', async ({ page }) => {
  await page.goto('/ios/icon');
  await expectAccessiblePage({ page });
});
