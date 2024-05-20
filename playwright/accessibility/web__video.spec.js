// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Video Accessibility check', async ({ page }) => {
  await page.goto('/web/video');
  await expectAccessiblePage({ page });
});
