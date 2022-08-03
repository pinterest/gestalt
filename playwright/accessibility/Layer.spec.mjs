// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Layer Accessibility check', async ({ page }) => {
  await page.goto('/web/layer');
  await expectAccessiblePage({ page });
});
