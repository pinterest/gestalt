// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android SearchGuide Accessibility check', async ({ page }) => {
  await page.goto('/android/searchguide');
  await expectAccessiblePage({ page });
});
