import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Typography guidelines check', async ({ page }) => {
  await page.goto('/foundations/typography');
  await expectAccessiblePage({ page });
});
