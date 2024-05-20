import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Overview Android component page check', async ({ page }) => {
  await page.goto('/android/overview');
  await expectAccessiblePage({ page });
});
