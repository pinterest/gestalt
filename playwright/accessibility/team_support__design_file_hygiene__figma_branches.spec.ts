import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Figma branches Accessibility check', async ({ page }) => {
  await page.goto('/team_support/design_file_hygiene/figma_branches');
  await expectAccessiblePage({ page });
});
