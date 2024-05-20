import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Table Accessibility check', async ({ page }) => {
  await page.goto('/web/table');
  await expectAccessiblePage({ page });
});
