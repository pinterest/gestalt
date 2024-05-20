import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Label Accessibility check', async ({ page }) => {
  await page.goto('/web/label');
  await expectAccessiblePage({ page });
});
