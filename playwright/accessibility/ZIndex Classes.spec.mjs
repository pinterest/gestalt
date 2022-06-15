// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('ZIndex Classes Accessibility check', async ({ page }) => {
  await page.goto('/zindex_classes');
  await expectAccessiblePage({ page });
});
