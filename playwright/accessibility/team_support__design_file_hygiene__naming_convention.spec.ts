import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Naming convention Accessibility check', async ({ page }) => {
  await page.goto('/team_support/design_file_hygiene/naming_convention');
  await expectAccessiblePage({ page });
});
