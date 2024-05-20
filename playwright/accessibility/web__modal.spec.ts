import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Modal Accessibility check', async ({ page }) => {
  await page.goto('/web/modal');
  await expectAccessiblePage({ page });
});
