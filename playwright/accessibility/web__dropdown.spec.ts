import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Dropdown Accessibility check', async ({ page }) => {
  await page.goto('/web/dropdown');
  await expectAccessiblePage({ page });
});
