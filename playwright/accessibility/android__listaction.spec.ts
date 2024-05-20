import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android ListAction Accessibility check', async ({ page }) => {
  await page.goto('/android/listaction');
  await expectAccessiblePage({ page });
});
