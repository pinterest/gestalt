// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS Tabs Accessibility check', async ({ page }) => {
  await page.goto('/ios/tabs');
  await expectAccessiblePage({ page });
});
