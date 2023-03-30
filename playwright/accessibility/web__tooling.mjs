// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Iconography and SVGs Accessibility check', async ({ page }) => {
  await page.goto('/web/tooling');
  await expectAccessiblePage({ page });
});
