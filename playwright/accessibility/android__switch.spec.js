// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android Switch Accessibility check', async ({ page }) => {
  await page.goto('/android/switch');
  await expectAccessiblePage({ page });
});
