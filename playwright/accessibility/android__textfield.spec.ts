import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android TextField Accessibility check', async ({ page }) => {
  await page.goto('/android/textfield');
  await expectAccessiblePage({ page });
});
