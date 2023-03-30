// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('IconButtonFLoating Accessibility check', async ({ page }) => {
  await page.goto('/web/iconbuttonfloating');
  await expectAccessiblePage({ page });
});
