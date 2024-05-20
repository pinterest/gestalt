import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS ButtonToggle Page Accessibility check', async ({ page }) => {
  await page.goto('/ios/buttontoggle');
  await expectAccessiblePage({ page });
});
