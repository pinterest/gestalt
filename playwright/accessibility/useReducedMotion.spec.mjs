// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('useReducedMotion Accessibility check', async ({ page }) => {
  await page.goto('/usereducedmotion');
  await expectAccessiblePage({ page });
});
