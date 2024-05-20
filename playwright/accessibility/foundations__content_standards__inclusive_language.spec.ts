import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Content standards Language check', async ({ page }) => {
  await page.goto('/foundations/content_standards/Inclusive_Language');
  await expectAccessiblePage({ page });
});
