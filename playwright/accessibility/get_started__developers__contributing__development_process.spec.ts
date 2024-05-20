import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Development Accessibility check', async ({ page }) => {
  await page.goto('/get_started/developers/contributing/development_process');
  await expectAccessiblePage({ page });
});
