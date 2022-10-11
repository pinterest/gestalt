// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('AlertModal Accessibility check', async ({ page }) => {
  await page.goto('/web/alertmodal');
  await expectAccessiblePage({ page });
});
