import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android TextArea Accessibility check', async ({ page }) => {
  await page.goto('/android/textarea');
  await expectAccessiblePage({ page });
});
