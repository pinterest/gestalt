import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Iconography Usage Accessibility check', async ({ page }) => {
  await page.goto('/foundations/iconography/usage');
  await expectAccessiblePage({ page });
});
