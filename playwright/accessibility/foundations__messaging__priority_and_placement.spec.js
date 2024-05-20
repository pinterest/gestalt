// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Priority and Placement Accessibility check', async ({ page }) => {
  await page.goto('/foundations/messaging/priority_and_placement');
  await expectAccessiblePage({ page });
});
