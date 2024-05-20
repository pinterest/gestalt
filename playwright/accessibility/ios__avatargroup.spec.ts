import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS AvatarGroup Accessibility check', async ({ page }) => {
  await page.goto('/ios/avatargroup');
  await expectAccessiblePage({ page });
});
