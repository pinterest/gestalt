import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('About us List check', async ({ page }) => {
  await page.goto('/web/list');
  await expectAccessiblePage({ page });
});
