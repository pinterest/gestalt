// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Video Accessibility check', async ({ page }) => {
  await page.goto('/video');
  await expectAccessiblePage({ page });
});
