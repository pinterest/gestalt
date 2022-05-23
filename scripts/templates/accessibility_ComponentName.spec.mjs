// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us ComponentName check', async ({ page }) => {
  await page.goto('/componentname');
  await expectAccessiblePage({ page });
});
