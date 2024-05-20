// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('RadioGroup Accessibility check', async ({ page }) => {
  await page.goto('/web/radiogroup');
  await expectAccessiblePage({ page });
});
