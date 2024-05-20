import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('HelpButton Accessibility check', async ({ page }) => {
  await page.goto('/web/helpbutton');
  await expectAccessiblePage({ page });
});
