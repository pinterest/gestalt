import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android Button Page Accessibility check', async ({ page }) => {
  await page.goto('/android/button');
  await expectAccessiblePage({ page });
});
