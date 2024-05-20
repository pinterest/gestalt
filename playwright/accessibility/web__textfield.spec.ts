import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('TextField Accessibility check', async ({ page }) => {
  await page.goto('/web/textfield');
  await expectAccessiblePage({ page });
});
