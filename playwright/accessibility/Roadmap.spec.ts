import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Roadmap check', async ({ page }) => {
  await page.goto('/roadmap');
  await expectAccessiblePage({ page });
});
