import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Installation Accessibility check', async ({ page }) => {
  await page.goto('/get_started/developers/installation');
  await expectAccessiblePage({ page });
});
