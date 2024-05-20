import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('How to Hack Around Gestalt Accessibility check', async ({ page }) => {
  await page.goto('/get_started/developers/hacking_gestalt');
  await expectAccessiblePage({ page });
});
