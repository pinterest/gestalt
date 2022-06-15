// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('RadioGroup Accessibility check', async ({ page }) => {
  await page.goto('/radiogroup');
  await expectAccessiblePage({ page });
});
