// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('AvatarPair Accessibility check', async ({ page }) => {
  await page.goto('/avatarpair');
  await expectAccessiblePage({ page });
});
