import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('SelectList Accessibility check', async ({ page }) => {
  await page.goto('/web/selectlist');
  await expectAccessiblePage({ page });
});
