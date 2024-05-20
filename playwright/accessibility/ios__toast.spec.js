// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS Toast Accessibility check', async ({ page }) => {
  await page.goto('/ios/toast');
  await expectAccessiblePage({ page });
});
