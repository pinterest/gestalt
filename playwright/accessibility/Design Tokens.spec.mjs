// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Design Tokens Accessibility check', async ({ page }) => {
  await page.goto('/design_tokens');
  await expectAccessiblePage({ page });
});
