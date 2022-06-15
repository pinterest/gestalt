// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Avatar Accessibility check', async ({ page }) => {
  await page.goto('/avatar');
  await expectAccessiblePage({ page });
});
