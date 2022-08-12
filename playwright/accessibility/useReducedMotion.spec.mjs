// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('useReducedMotion Accessibility check', async ({ page }) => {
  await page.goto('/web/utilities/usereducedmotion');
  await expectAccessiblePage({ page });
});
