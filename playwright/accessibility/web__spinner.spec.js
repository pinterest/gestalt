// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Spinner Accessibility check', async ({ page }) => {
  await page.goto('/web/spinner');
  await expectAccessiblePage({ page });
});
