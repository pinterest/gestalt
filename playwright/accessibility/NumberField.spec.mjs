// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('NumberField Accessibility check', async ({ page }) => {
  await page.goto('/web/numberfield');
  await expectAccessiblePage({ page });
});
