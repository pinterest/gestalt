import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Design handoff Accessibility check', async ({ page }) => {
  await page.goto('/team_support/design_file_hygiene/design_handoff');
  await expectAccessiblePage({ page });
});
