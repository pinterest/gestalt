// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android AvatarGroup Accessibility check', async ({ page }) => {
  await page.goto('/android/avatargroup');
  await expectAccessiblePage({ page });
});
