import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Web component status check', async ({ page }) => {
  await page.goto('/web/component_status');
  await expectAccessiblePage({ page });
});
