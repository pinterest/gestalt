// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Fieldset Accessibility check', async ({ page }) => {
  await page.goto('/fieldset');
  await expectAccessiblePage({ page });
});
