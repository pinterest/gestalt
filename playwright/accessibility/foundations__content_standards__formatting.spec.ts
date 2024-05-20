import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Content standards Formatting check', async ({ page }) => {
  await page.goto('/foundations/content_standards/formatting');
  await expectAccessiblePage({ page });
});
