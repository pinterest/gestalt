// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Android AvatarGroup Accessibility check', async ({ page }) => {
  await page.goto('/android/avatargroup');
  await expectAccessiblePage({ page });
});
