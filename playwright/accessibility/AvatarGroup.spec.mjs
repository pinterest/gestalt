// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('AvatarGroup Accessibility check', async ({ page }) => {
  await page.goto('/web/avatargroup');
  await expectAccessiblePage({
    page,
    rules: {
      // aria-label attribute cannot be used on a div with no valid role attribute.
      'aria-allowed-attr': { enabled: false },
    },
  });
});
