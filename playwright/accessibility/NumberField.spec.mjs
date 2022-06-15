// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('NumberField Accessibility check', async ({ page }) => {
  await page.goto('/numberfield');
  await expectAccessiblePage({ page });
});
