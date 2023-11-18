// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS AvatarGroup Accessibility check', async ({ page }) => {
    await page.goto('/ios/avatargroup');
    await expectAccessiblePage({ page });
});
