// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS Badge Page Accessibility check', async ({ page }) => {
  await page.goto('/ios/badge');
  await expectAccessiblePage({ page });
});
