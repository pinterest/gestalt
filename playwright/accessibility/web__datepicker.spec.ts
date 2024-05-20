import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('DatePicker Accessibility check', async ({ page }) => {
  await page.goto('/web/datepicker');
  await expectAccessiblePage({ page });
});
