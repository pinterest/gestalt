import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android IconButtonFloating Accessibility check', async ({ page }) => {
  await page.goto('/android/iconbuttonfloating');
  await expectAccessiblePage({ page });
});
