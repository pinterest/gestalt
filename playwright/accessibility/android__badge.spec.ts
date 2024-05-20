import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android Badge Page Accessibility check', async ({ page }) => {
  await page.goto('/android/badge');
  await expectAccessiblePage({ page });
});
