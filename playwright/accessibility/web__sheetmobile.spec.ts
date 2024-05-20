import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('About us SheetMobile check', async ({ page }) => {
  await page.goto('/sheetmobile');
  await expectAccessiblePage({ page });
});
