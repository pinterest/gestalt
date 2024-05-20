// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS IconButtonFloating Accessibility check', async ({ page }) => {
  await page.goto('/ios/iconbuttonfloating');
  await expectAccessiblePage({ page });
});
