import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android SearchField Accessibility check', async ({ page }) => {
  await page.goto('/android/searchfield');
  await expectAccessiblePage({ page });
});
