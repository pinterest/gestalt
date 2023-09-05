// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Web TapAreaLink Accessibility check', async ({ page }) => {
  await page.goto('/web/taparealink');
  await expectAccessiblePage({ page });
});
