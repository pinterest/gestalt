import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Color Usage Accessibility check', async ({ page }) => {
  await page.goto('/foundations/color/usage');
  await expectAccessiblePage({ page });
});
