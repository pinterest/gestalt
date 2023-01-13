// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Content standards Voice Accessibility check', async ({ page }) => {
  await page.goto('/foundations/content_standards/voice');
  await expectAccessiblePage({ page });
});
