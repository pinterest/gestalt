// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android Icon Accessibility check', async ({ page }) => {
  await page.goto('/Android/icon');
  await expectAccessiblePage({ page });
});
