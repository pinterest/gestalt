import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Overview Team Support Accessibility check', async ({ page }) => {
  await page.goto('/team_support/overview');
  await expectAccessiblePage({ page });
});
