import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Status Accessibility check', async ({ page }) => {
  await page.goto('/web/status');
  await expectAccessiblePage({ page });
});
