// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('DatePicker Accessibility check', async ({ page }) => {
  await page.goto('/web/datepicker');
  await expectAccessiblePage({ page });
});
