// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS SearchField Accessibility check', async ({ page }) => {
  await page.goto('/ios/searchfield');
  await expectAccessiblePage({ page });
});
