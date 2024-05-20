import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android Text Accessibility check', async ({ page }) => {
  await page.goto('/android/text');
  await expectAccessiblePage({ page });
});
