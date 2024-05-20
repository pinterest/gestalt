import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Messaging overview accessibility check', async ({ page }) => {
  await page.goto('/foundations/international_design/icon_localization');
  await expectAccessiblePage({ page });
});
