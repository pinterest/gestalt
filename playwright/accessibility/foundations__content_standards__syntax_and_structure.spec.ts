import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Content standards Syntax Structure check', async ({ page }) => {
  await page.goto('/foundations/content_standards/syntax_and_structure');
  await expectAccessiblePage({ page });
});
