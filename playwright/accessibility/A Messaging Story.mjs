// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('A Messaging Story Accessibility check', async ({ page }) => {
  await page.goto('/foundations/messaging/a_messaging_story');
  await expectAccessiblePage({ page });
});
