// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('A Messaging Story Accessibility check', async ({ page }) => {
  await page.goto('/foundations/messaging/overview_messaging');
  await expectAccessiblePage({ page });
});
