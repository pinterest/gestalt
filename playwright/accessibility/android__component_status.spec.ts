import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android component status check', async ({ page }) => {
  await page.goto('/android/component_status');
  await expectAccessiblePage({ page });
});
