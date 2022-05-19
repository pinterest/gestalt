// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('RadioButton Accessibility check', async ({ page }) => {
  await page.goto('/radiobutton');
  await expectAccessiblePage({ page });
});
