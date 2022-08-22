// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Messaging Principles Accessibility check', async ({ page }) => {
  await page.goto('/foundations/messaging/principles');
  await expectAccessiblePage({ page });
});
